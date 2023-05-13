class DateNow{
    date() {
        const d= new Date();
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
    }

    time(){
        const d= new Date();
        return `${d.getHours()}:${d.getMinutes()}` 
    }
}

export default new DateNow();