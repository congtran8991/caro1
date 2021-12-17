export const checkWinCheoPhai = (dataCheck:any)=>{
    dataCheck.sort(function(a:any,b:any) {
      return (a.y-b.y)
    });
    dataCheck.sort(function(a:any,b:any) {
      return ((a.x+a.y)-(b.x+b.y));
    });
    let dem:number = 1;
    let dem1:number = 1;
    for(let i = 0;i<dataCheck.length;i++){
      let check1 = (dataCheck[i]?.x + dataCheck[i]?.y) === (dataCheck[i+1]?.x + dataCheck[i+1]?.y);
      let check2 = (dataCheck[i]?.x -1  === dataCheck[i+1]?.x);
      let check3 = (dataCheck[i]?.y + 1  === dataCheck[i+1]?.y);
      if(check1 && check2 && check3){
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