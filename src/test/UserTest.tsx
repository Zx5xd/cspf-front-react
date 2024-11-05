import axios from 'axios';


export const UserTest = async () => {
  try {
    const response = await axios.get("http://cspf.kro.kr:50952/user");

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }


}