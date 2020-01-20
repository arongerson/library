import { environment } from '../../environments/environment';
let baseUrl = "http://192.168.1.13:8080/library/";
if (environment.production) {
   baseUrl = "http://ec2-3-15-64-172.us-east-2.compute.amazonaws.com:8080/library/";
}
export const BASE_SERVER_URL = baseUrl;