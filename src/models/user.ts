class User {
  id: string;
  first_name: string;
  last_name: string;
  image: string;
  email: string;
  jwt_token: string;

  constructor(
    id: string,
    first_name: string,
    last_name: string,
    image: string,
    email: string,
    jwt_token: string
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.image = image;
    this.email = email;
    this.jwt_token = jwt_token;
  }
}
export default User;
