export const checkWinCheoTrai = (dataCheck:any)=>{
    dataCheck.sort(function(a:any,b:any) {
      return (a.x-b.x)
    });
    dataCheck.sort(function(a:any,b:any) {
      return ((a.x-a.y)-(b.x-b.y));
    });
    let dem:number = 1;
    let dem1:number = 1;
    for(let i = 0;i<dataCheck.length;i++){
      if((dataCheck[i]?.x - dataCheck[i]?.y) === (dataCheck[i+1]?.x - dataCheck[i+1]?.y) && (dataCheck[i]?.x + dataCheck[i]?.y)+2 === (dataCheck[i+1]?.x + dataCheck[i+1]?.y)){
        dem++
      }else{
        if(dem>dem1){
          dem1 = dem
          dem = 1
        }
      }
    }
    if(dem1>4){
   return true
  }   
  }