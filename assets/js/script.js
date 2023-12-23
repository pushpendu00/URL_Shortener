async function logOutFun(){
    try{
        // console.log("hello");
        let result = await $.ajax({
            type : 'post',
            url : '/log-out'
        });
        window.location = '/';
    }catch(err){
        console.log(err);
    }
}