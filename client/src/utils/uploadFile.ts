export async function getURLfromFile(file:File,load:(e:string)=>void){
    const reader=new FileReader();
    reader.onloadend=()=>{
        load(reader.result as string);
    }
    reader.readAsDataURL(file);
}
