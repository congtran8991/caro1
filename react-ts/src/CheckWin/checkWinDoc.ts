export const checkWinDoc = (dataCheck:any)=>{
    dataCheck.sort(function(a:any,b:any) {
      return (a.x - b.x);
    });
    dataCheck.sort(function(a:any,b:any) {
      return (a.y - b.y);
    });
    
    let dem:number = 1;
    let dem1:number = 1;
    for(let i = 0;i<dataCheck.length;i++){
      if(dataCheck.length > 2){
        if((dataCheck[i].x+1 === dataCheck[i+1]?.x) && (dataCheck[i].y===dataCheck[i+1]?.y)){
          dem++
       }else{
           if(dem >= dem1){
             dem1 = dem
             dem = 1
           }
       }
      }
    }
    if(dem1>2){
      return true
    }
  }