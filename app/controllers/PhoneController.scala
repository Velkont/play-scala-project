package controllers

import java.io.{BufferedWriter, FileWriter}

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._
import play.api.libs.json.Json

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}

class PhoneController @Inject()(config: play.api.Configuration, repo: PhoneRepository,
                                  cc: MessagesControllerComponents
                                )(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {


  val validationTemplate = """\+\d{1,4}-\d{10}""".r

  def addPhone = Action.async { implicit request =>
    val json = request.body.asJson.get
    val name = (json\"name").as[String]
    val number = (json\"number").as[String]
    val toReturn = number match {
      case validationTemplate(_*) =>{
        val findingResult = findNumber("\\"+number).flatMap{ rs =>
          if(rs.isEmpty){
              repo.create(name, number)
              Future.successful(Ok("Phone successfully added"))
            }
          else{
              Future.successful(Ok("Phone exists"))
            }
          }
        findingResult
      }
      case _ => Future.successful(Ok("The phone number is invalid"))
    }
    toReturn
  }
  def updatePhone(id: Long) = Action.async { implicit request =>
    val json = request.body.asJson.get
    val name = (json\"name").as[String]
    val number = (json\"number").as[String]
    repo.update(id, name, number)
    Future.successful(Ok("Phone successfully updated"))
  }
  def findByName(name: String) = Action.async { implicit request =>
    repo.findByName(name).map(phones =>{
      Ok(Json.toJson(phones))
    })
  }
  def findByNumber(number: String) = Action.async { implicit request =>
    val cleanNumber = number.trim()
    findNumber(cleanNumber).map(phones => {
      Ok(Json.toJson(phones))
    })
  }
  def deletePhone(id: Long) = Action.async { implicit request =>
    repo.delete(id)
    Future.successful(Ok("Phone successfully deleted"))
  }

  def getPhones = Action.async { implicit request =>
    repo.list().map { phones =>
      Ok(Json.toJson(phones))
    }
  }
  def findNumber(number: String) = {
    repo.findByNumber(number)
  }
  def writeToCSV= Action.async { implicit request =>
    val table = repo.list()
    table.map(x=> {
      val outputFile = new BufferedWriter(new FileWriter(config.get[String]("csvPath.csvPath")))
      outputFile.write("id,name,number\n")
      x.map(row=>{
        outputFile.write(s"${row.id},${row.name},${row.number}\n")
      })
      outputFile.close()
    })
    Future.successful(Ok("Database has been written to CSV"))
  }
}

case class CreatePhoneForm(name: String, number: String)
