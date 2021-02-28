import Cookies from 'universal-cookie';


const Logout = () =>{

    const cookies = new Cookies();
    const logout=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('token', {path: "/"});
        cookies.remove('authorities', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }
    logout();
}


export default Logout;
