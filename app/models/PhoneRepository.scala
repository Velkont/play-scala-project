package models

import java.io.{BufferedWriter, FileWriter}

import javax.inject.{Inject, Singleton}
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.{GetResult, JdbcProfile}

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}

/**
 * A repository for people.
 *
 * @param dbConfigProvider The Play db config provider. Play will inject this for you.
 */
@Singleton
class PhoneRepository @Inject() (dbConfigProvider: DatabaseConfigProvider)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]


  import dbConfig._
  import profile.api._


  private class PhonesTable(tag: Tag) extends Table[Phone](tag, "phones") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    def name = column[String]("name")

    def number = column[String]("number")

    def * = (id, name, number) <> ((Phone.apply _).tupled, Phone.unapply)
  }


  implicit val getPhoneResult = GetResult(r => Phone(r.<<, r.<<, r.<<))
  private val phones = TableQuery[PhonesTable]


  def create(name: String, number: String): Future[Phone] = db.run {
    (phones.map(p => (p.name, p.number))
      returning phones.map(_.id)
      into ((nameNumber, id) => Phone(id, nameNumber._1, nameNumber._2))
    ) += (name, number)
  }
  def delete(id: Long) : Future[Int] = db.run {
    phones.filter(_.id === id).delete

  }
  def update (id: Long, name: String, number: String) : Future[Int] = {
    val phone = Phone(id, name, number)
    db.run(phones.insertOrUpdate(phone))
  }

  def findByName(name: String): Future[Seq[Phone]]= {
    db.run(sql""" SELECT * FROM phones WHERE name ~* ${name}; """.as[Phone])
  }
  def findByNumber(number: String): Future[Seq[Phone]]= {
    db.run(sql""" SELECT * FROM phones WHERE number ~* ${number}; """.as[Phone])
  }

  def list(): Future[Seq[Phone]] = db.run {
    phones.result
  }
}
