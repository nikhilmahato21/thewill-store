import { HttpStatusCodeType } from "../config/http.config";
import { ErrorCodeEnumType } from "../enums/error-code.enum";

export class AppError extends Error {
  public statusCode: HttpStatusCodeType;
  public errorCode?: ErrorCodeEnumType;

  constructor(
    message:string,
    statusCode =
  )
}


