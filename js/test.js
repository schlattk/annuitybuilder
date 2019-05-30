var getPrice = (function (){

$.ajax({
    url: "file:///Users/konradschlatte/Desktop/programming/Better%20Annuity%202.1%20ajax/images/data.xml",
    dataType: "xml",
    success: function (data) {
        var xml_object, prices, current_node, instrument_name, price, input, one ,var1_price;
        instrument_name = [];
        price = [];
        
        // Make JQ object from XML doc:
        xml_object = $(data);
        
        // Get collection of child nodes by name:
        prices = xml_object.find('SILO_DAILY_PRICES');

        




        
        // Iterate child nodes...
  			prices.each(function () {
            // Make JQ object from child node:
            
          current_node = $(this);
            // Get one of it's attributes:
           
          
          instrument_name.push(current_node.attr('INSTRUMENT_NAME'));
          price.push(current_node.attr('CLEAN_PRICE'));
          //console.log(price.length);
          


          
          //console.log(current_node.attr('INSTRUMENT_NAME'));

         //console.log(current_node.attr('CLEAN_PRICE'));
       
         
        });

  			input = bondTool.UkGilts[0].name;
          one = instrument_name.indexOf(input);
          var1_price = price[one];
          console.log(var1_price);
  		 
      }
    });

  return {



  input: input,
  var1_price: var1_price

  }


}(bondTool));


