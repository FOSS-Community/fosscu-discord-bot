from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class CreateHash:
    def bcrypt(password: str):
        return password_context.hash(password)

    def verify(hashed_pasword: str, plain_password: str):
        return password_context.verify(plain_password, hashed_pasword)