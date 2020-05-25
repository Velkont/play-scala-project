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
  // We want the JdbcProfile for this provider
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  // These imports are important, the first one brings db into scope, which will let you do the actual db operations.
  // The second one brings the Slick DSL into scope, which lets you define the table and other queries.
  import dbConfig._
  import profile.api._

  /**
   * Here we define the table. It will have a name of people
   */
  private class PhonesTable(tag: Tag) extends Table[Phone](tag, "phones") {

    /** The ID column, which is the primary key, and auto incremented */
    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)

    /** The name column */
    def name = column[String]("name")

    /** The age column */
    def number = column[String]("number")

    /**
     * This is the tables default "projection".
     *
     * It defines how the columns are converted to and from the Person object.
     *
     * In this case, we are simply passing the id, name and page parameters to the Person case classes
     * apply and unapply methods.
     */
    def * = (id, name, number) <> ((Phone.apply _).tupled, Phone.unapply)
  }

  /**
   * The starting point for all queries on the people table.
   */
  implicit val getPhoneResult = GetResult(r => Phone(r.<<, r.<<, r.<<))
  private val phones = TableQuery[PhonesTable]

  /**
   * Create a person with the given name and age.
   *
   * This is an asynchronous operation, it will return a future of the created person, which can be used to obtain the
   * id for that person.
   */
  def create(name: String, number: String): Future[Phone] = db.run {
    // We create a projection of just the name and age columns, since we're not inserting a value for the id column
    (phones.map(p => (p.name, p.number))
      // Now define it to return the id, because we want to know what id was generated for the person
      returning phones.map(_.id)
      // And we define a transformation for the returned value, which combines our original parameters with the
      // returned id
      into ((nameNumber, id) => Phone(id, nameNumber._1, nameNumber._2))
    // And finally, insert the person into the database
    ) += (name, number)
  }
  def delete(id: Long) : Future[Int] = db.run {
    phones.filter(_.id === id).delete

  }
  def update (id: Long, name: String, number: String) : Future[Int] = {
    val phone = Phone(id, name, number)
    db.run(phones.insertOrUpdate(phone))
  }
  /*def findByName(name: String): Future[Seq[Phone]]= {
    db.run(phones.result.filter(row => row.toString.contains(name)))
  }*/
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
