  export class Task {
  id: number;
  name: string;
  desc: string;
  status: string; 

  constructor(id: number, name:string, desc:string, status:string)
  {
   this.id=id;
   this.name=name;
   this.desc=desc;
   this.status=status;
  }
}