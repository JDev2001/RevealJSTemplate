class SmartList extends HTMLElement {  
    constructor() {       
        super();


        this.tmp = "";
        this.append("<ul>");
        

        if(this.childNodes.length > 1)
        {
            this.childNodes.forEach((item)=>
            {
            
                if(item.innerHTML == null|| item.innerHTML.trim() === '') return        
                if(!item) return;

                if(this.attributes['fade'])
                this.append(`<li class="fragment">`);
                else
                    this.append("<li>");
                this.append(item.outerHTML);
                this.append("</li>");                   
            });
        }
        else
        {         
            var items = this.innerHTML.split("|");           
            items.forEach((item)=>
            {
                item = item.trim();
                if(item == null|| item.trim() === '') return        
                if(!item) return;

                // console.log(item)
                if(this.attributes['fade'])
                this.append(`<li class="fragment">`);
                else
                    this.append("<li>");
                this.append(item);                
                this.append("</li>");   
            });                
        }

          this.append("<ul>");
          
          this.innerHTML = "";
          this.innerHTML = this.tmp;

    }

    append(html)
    {      
        this.tmp += html;
    }
}

customElements.define("smart-list", SmartList); // (2)