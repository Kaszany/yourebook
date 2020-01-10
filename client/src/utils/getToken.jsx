 const getToken = () => {
     if(!localStorage.getItem('status')){
         return ''
     } else
    return localStorage.getItem('status');
}

export default getToken