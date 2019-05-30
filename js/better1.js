



var button2 = document.getElementById("button2");

button2.addEventListener("click",function (event) {
    event.stopPropagation();
    display_bonds();
}
);





var discount = [1, 0.9993, 0.9979, 0.9952, 0.9906, 0.984, 0.9749, 0.9637, 0.9503, 0.935, 0.918, 0.8996, 0.88, 0.8592, 0.838, 0.8165, 0.795, 0.774, 0.7533, 0.734, 0.715, 0.6975, 0.6812, 0.656, 0.6425, 0.6312, 0.621, 0.604, 0.597, 0.597, 0.5912, 0.5865, 0.582, 0.5783, 0.575, 0.572, 0.569, 0.566, .5625, 0.559, 0.559, 0.559, 0.559, 0.531, 0.531, 0.531, 0.531, 0.531, 0.531, 0.531, 0.4];
var labels = ['Year 1','Year 2','Year 3','Year 4','Year 5','Year 6','Year 7','Year 8','Year 9','Year 10','Year 11','Year 12','Year 13','Year 14','Year 15','Year 16','Year 17','Year 18','Year 19','Year 20','Year 21','Year 22','Year 23','Year 24','Year 25','Year 26','Year 27','Year 28','Year 29','Year 30','Year 31','Year 32','Year 33','Year 34','Year 35','Year 36','Year 37','Year 38','Year 39','Year 40','Year 41','Year 42','Year 43','Year 44','Year 45','Year 46','Year 47','Year 48','Year 49','Year 50'];

var gilts = ["0", "Treasury Coupon Strip 07Mar2017", "Treasury Coupon Strip 07Mar2018", "Treasury Coupon Strip 07Mar2019", "Treasury Coupon Strip 07Mar2020", "Treasury Coupon Strip 07Mar2021", "Treasury Coupon Strip 07Mar2022", "Treasury Coupon Strip 07Mar2023", "Treasury Coupon Strip 07Mar2024", "Treasury Coupon Strip 07Mar2025", "Treasury Coupon Strip 07Mar2026", "Treasury Coupon Strip 07Mar2027", "Treasury Coupon Strip 07Mar2028", "Treasury Coupon Strip 07Mar2029", "Treasury Coupon Strip 07Mar2030", "Treasury Coupon Strip 07Mar2031", "Treasury Coupon Strip 07Mar2032", "Treasury Coupon Strip 07Mar2033", "Treasury Coupon Strip 07Mar2034", "Treasury Coupon Strip 07Mar2035", "Treasury Coupon Strip 07Mar2036", "Treasury Coupon Strip 07Mar2037", "Treasury Coupon Strip 07Mar2038", "Treasury Coupon Strip 07Mar2039", "Treasury Coupon Strip 07Dec2039", "Treasury Coupon Strip 07Dec2040", "Treasury Coupon Strip 07Dec2041", "Treasury Coupon Strip 07Dec2042", "Treasury Coupon Strip 07Jun2042", "Treasury Coupon Strip 07Jun2043","Treasury Coupon Strip 07Dec2045", "Treasury Coupon Strip 07Dec2046", "Treasury Coupon Strip 07Dec2047", "Treasury Coupon Strip 07Dec2048", "Treasury Coupon Strip 07Dec2049", "Treasury Coupon Strip 07Dec2050", "Treasury Coupon Strip 07Dec2051", "Treasury Coupon Strip 07Dec2052", "Treasury Coupon Strip 07Dec2053", "Treasury Coupon Strip 07Dec2054", "Treasury Coupon Strip 07Dec2055", "Treasury Coupon Strip 07Dec2055", "Treasury Coupon Strip 07Dec2055", "Treasury Coupon Strip 07Dec2055"];



//     $.ajax({
//   //url: "file:///Users/konradschlatte/Desktop/programming/Better%20Annuity%202.1%20ajax/images/data.xml",
//   url:"images/data.xml",
//   dataType: "xml",
//   success: function (data) {
//       var xml_object, prices, current_node, instrument_name, price, a, one ,var1_price, var1_list = [];
//       instrument_name = [];
//       price = [];
//
//       // Make JQ object from XML doc:
//       xml_object = $(data);
//
//       // Get collection of child nodes by name:
//       prices = xml_object.find('SILO_DAILY_PRICES');
//
//
//
//
//
//
//
//       // Iterate child nodes...
//       prices.each(function () {
//           // Make JQ object from child node:
//
//         current_node = $(this);
//           // Get one of it's attributes:
//
//
//         instrument_name.push(current_node.attr('INSTRUMENT_NAME'));
//         price.push(current_node.attr('CLEAN_PRICE'));
//
//
//       });
//
//       for (i = 1; i < gilts.length; i++){
//
//            a = gilts[i];
//            one = instrument_name.indexOf(a);
//            var1_price = price[one];
//            discount[i] = (var1_price/100);
//            //gilts = parseFloat(var1_list[i]);
//
//
//       }
//
// }

// });


display_bonds = function (){
    var start_el = document.getElementById("start");//first payment date for the annuity
    var start = parseInt(start_el.value);
    var life_el = document.getElementById("life");//length of the annuity
    var life = parseInt(life_el.value);
    var amount_el = document.getElementById("amount");//money to be invested
    var amount = parseInt(amount_el.value);
    var increase_el = document.getElementById("increase");
    var increase = parseFloat(increase_el.value)/100;
    var outputchart_el = document.querySelectorAll(".outputchart")[0];
    var divTitle = document.getElementById("income");
    var pElement = divTitle.querySelectorAll("span");
    var pElementLength = pElement.length;
    var canvasElement = divTitle.querySelectorAll("canvas");
    var canvasElementLength = canvasElement.length;
    var divTitle2 = document.getElementById("bondoutput");
    var liElement = divTitle2.querySelectorAll("li");
    var liElementLength = liElement.length;
    var scrollButton = document.querySelectorAll(".scroll-button");
    var scrollButton2 = document.querySelectorAll(".scroll-button2");



    if (pElementLength > 0){
        for(i = 0; i < pElementLength; i++){ //loops remove any existing p or canvas elements from the dom
            divTitle.removeChild(pElement[i]);
        }
    }

    if (canvasElementLength > 0){
        for(i = 0; i < canvasElementLength; i++){
            divTitle.removeChild(canvasElement[i]);
        }
    }

    if (liElementLength > 0){
        for(i = 0;i < liElementLength; i++){
            divTitle2.removeChild(liElement[i]);
        }
    }

    var increase_factor = [1,Math.pow(1+increase,1),Math.pow(1+increase,2),Math.pow(1+increase,3),Math.pow(1+increase,4),Math.pow(1+increase,5),Math.pow(1+increase,6),Math.pow(1+increase,7),Math.pow(1+increase,8),Math.pow(1+increase,9),Math.pow(1+increase,10),Math.pow(1+increase,11),Math.pow(1+increase,12),Math.pow(1+increase,13),Math.pow(1+increase,14),Math.pow(1+increase,15),Math.pow(1+increase,16),Math.pow(1+increase,17),Math.pow(1+increase,18),Math.pow(1+increase,19),Math.pow(1+increase,20),Math.pow(1+increase,21),Math.pow(1+increase,22),Math.pow(1+increase,23),Math.pow(1+increase,24),Math.pow(1+increase,25),Math.pow(1+increase,26),Math.pow(1+increase,27),Math.pow(1+increase,28),Math.pow(1+increase,29),Math.pow(1+increase,30),Math.pow(1+increase,31),Math.pow(1+increase,32),Math.pow(1+increase,33),Math.pow(1+increase,34),Math.pow(1+increase,35),Math.pow(1+increase,36),Math.pow(1+increase,37),Math.pow(1+increase,38),Math.pow(1+increase,39),Math.pow(1+increase,40),Math.pow(1+increase,41),Math.pow(1+increase,42),Math.pow(1+increase,43),Math.pow(1+increase,44),Math.pow(1+increase,45),Math.pow(1+increase,46),Math.pow(1+increase,47),Math.pow(1+increase,48),Math.pow(1+increase,49),Math.pow(1+increase,50)];




    //discountfactors and bonds
    var bonds = []; //array for chosen bonds
    var sum = [];//array for chosen discountfactors
    var disc = 0;//variable for sum of df
    var income = 0; //variable for annual income
    var increase_choice = [];//array for increase factors chosen
    var sumproduct = 0;//variable for sumproduct of increasefactors and discountfactors
    var cashflows = [];
    if (start + life <= 39 && start >= 1 && increase_el.value !== ""){//if function checks whether maturities are withinrange and start in one year at the earliest as well as whether increase input is empty
        for(i = start;i < start + life; i++){      //for loop selects the relevant annuities and gilts
            sum.push(discount[i]); //moves the relevant disc factors into the sum variable
            bonds.push(gilts[i]);
        }                      //for loop selects the increase factors - the first payment does not increase
        for(i = 1; i <= life; i++){
            increase_choice.push(increase_factor[i]);
        }
        var sumLength = sum.length;
        var bondsLength = bonds.length;
        for (i = 0; i < sumLength; i++){
            sumproduct += (sum[i])*(increase_choice[i]);//multiply discountfactors and increasefactors
        }
        console.log(sum);
        income = Math.round(amount/sumproduct/10)*10;
        //final value
        cashflows =[income * increase_factor[0],income * increase_factor[1],income * increase_factor[2],income * increase_factor[3],income * increase_factor[4],income * increase_factor[5],income * increase_factor[6],income * increase_factor[7],income * increase_factor[8],income * increase_factor[9],income * increase_factor[10],income * increase_factor[11],income*increase_factor[12],income*increase_factor[13],income*increase_factor[14],income*increase_factor[15],income*increase_factor[16],income*increase_factor[17],income*increase_factor[18],income*increase_factor[19],income*increase_factor[20],income*increase_factor[21],income*increase_factor[22],income*increase_factor[23],income*increase_factor[24],income*increase_factor[25],income*increase_factor[26],income*increase_factor[27],income*increase_factor[28],income*increase_factor[29],income*increase_factor[30],income*increase_factor[31],income*increase_factor[32],income*increase_factor[33],income*increase_factor[34],income*increase_factor[35],income*increase_factor[36],income*increase_factor[37],income*increase_factor[38],income*increase_factor[39],income*increase_factor[40],income*increase_factor[41],income*increase_factor[42],income*increase_factor[43],income*increase_factor[44],income*increase_factor[45],income*increase_factor[46],income*increase_factor[47],income*increase_factor[48],income*increase_factor[49],income*increase_factor[50]];

        var incometext = "Your income is "+income+" Pounds increasing by "+(increase*100).toFixed(2)+" percent per year";

        divTitle.insertAdjacentHTML('afterbegin', "<span>"+ incometext + "</span>");
        divTitle.insertAdjacentHTML('beforeend', "<canvas id = 'outputchart'></canvas>");

        for(i = 0; i < bondsLength; i++){
            divTitle2.insertAdjacentHTML('beforeend',"<li>"+Math.round(cashflows[i+1]/10)*10+" Pounds Notional of the "+bonds[i]+"</li>");
        }


        var betterData =

      {
          labels: [],

          datasets: [
              {
                  label: "Principal & Coupons",
                  backgroundColor:
                "#9C50B5"
                  ,
                  borderColor:
                "#9C50B5"
                  ,
                  borderWidth: 1,
                  scaleLabel: "<%= '  ' + value%>",
                  data: [],
              },



          ]
      };
        for(i = 0; i < life; i++){
            betterData.datasets[0].data.push(Math.round(cashflows[i]));
        }
        for(i = start-1;i < life+start-1; i++){
            betterData.labels.push(labels[i]);
        }

        var better = document.getElementById('outputchart').getContext('2d');



        var Betterchart = new Chart(better,{
            type: "bar",
            data: betterData,
            options: {
                scales: {

                    xAxes: [{
                        stacked: true,
                        gridLines: {display:false
                        }
                    }],
                    yAxes: [{
                        stacked: true,
                        gridLines: {display:false
                        }

                    }]
                },
                legend:{display:false}
            }


        }
        );
    }
    else {var faulttext = "Maturity has to be 40 years maximum and start date at the earliest in 1 years time"+'<img src="images/sadface.svg">'+' and increase field cannot be empty';
        divTitle.insertAdjacentHTML('afterbegin',"<span>"+ faulttext + "</span>");
    }




};
