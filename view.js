class View{
    static command(param){
        console.log(`node main.js ${param}`);
    }
    static added(command,name){
        // console.log(command,name);
        
        console.log(`${command} ${name} successfully created`);
    }
    static update(data){
        console.log(`${data[0]} id ${data[1]} ${data[2]} replace with ${data.slice(4).join(' ')}`);
    }
    static delete(data){
        // console.log(data);
        console.log(`${data[0]} id ${data[1]} delete successfully`);
    }
    static show(param){
        console.table(param);
    }
}

module.exports = View