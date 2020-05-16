package models

import play.api.libs.json._

case class Phone(id: Long, name: String, number: String)

object Phone {
  implicit val phoneFormat = Json.format[Phone]
}
