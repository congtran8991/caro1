export const checkWinNgang = (dataCheck:any)=>{
    dataCheck.sort(function(a:any,b:any) {
      return a.y - b.y;
    });
    dataCheck.sort(function(a:any,b:any) {
      return a.x - b.x;
    });
    let dem:number = 1;
    let dem1:number = 1;
    for(let i = 0;i<dataCheck.length;i++){
      if(dataCheck.length > 4){
        if((dataCheck[i].y+1 === dataCheck[i+1]?.y) && (dataCheck[i].x===dataCheck[i+1]?.x)){
          dem++
       }else{
           if(dem >= dem1){
             dem1 = dem
             dem = 1
           }
       }
      }
    }
    if(dem1>4){
      return true
    }
  }

// export default checkWinNgang