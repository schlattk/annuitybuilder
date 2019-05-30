

var today = new Date();
var Today = new Date().valueOf();

function Bonds(notional,name,coupon,price,maturity,ISIN,rating){
    this.notional = notional;
    this.name = name;
    this.coupon = coupon;
    this.price = price;
    this.maturity = maturity;
    this.ISIN = ISIN;
    this.rating = rating;
}
Bonds.prototype.dates = function () {
    var dates = [];
    var datesConsec =[];
    var datesNew = [];
    dates.push(this.maturity);
    var years = Math.floor((this.maturity.valueOf() - Today)/31556900000);
    for(i = 0; i < years ; i++){dates.push(new Date(dates[i] - 31556900000));}
    datelength = dates.length;
    for ( i = 0; i < dates.length; i++){
        dates[i] = dates[i].toDateString();
    }
    datesConsec = dates.reverse();

    return datesConsec;
};
Bonds.prototype.couponflow = function (){
    return Math.round(this.notional * this.coupon);
};
Bonds.prototype.purchaseprice = function (){
    return (this.notional * (this.price/100 + this.accrued()));
};
Bonds.prototype.accrued = function (){
    var couponFlowList = [];
    couponFlowList.push(this.maturity);
    var years = Math.ceil((this.maturity.valueOf() - Today)/31556900000);
    for(i = 0; i < years; i++){couponFlowList.push(couponFlowList[i] - 31556900000);}
    var accrual = ((Today - couponFlowList[years])/31556900000) * this.coupon;
    return accrual;
};



var UkGilts = [];

var corporate = [];

var corporate_inv = [];


$.ajax({
    url:"images/data.xml",
    dataType: "xml",
    success: function (data) {
        var xml_object, prices, current_node, instrument_name, price, a, b, one,coupon, maturity, ISIN, two ,var1_price, var2_price, var2_list = []; var1_list = [];
        instrument_name = [];
        price = [];
        coupon =[];
        maturity =[];
        ISIN = [];


        // Make JQ object from XML doc:
        xml_object = $(data);

        // Get collection of child nodes by name:
        prices = xml_object.find('SILO_DAILY_PRICES');

        prices.each(function () {

            current_node = $(this);

            instrument_name.push(current_node.attr('INSTRUMENT_NAME'));
            price.push(Math.round(current_node.attr('CLEAN_PRICE')*100)/100);
            maturity.push(current_node.attr("REDEMPTION_DATE"));
            ISIN.push(current_node.attr('ISIN_CODE'));

        });

        for (i = 0; i < instrument_name.length; i++){

            if (instrument_name[i].search("Stock") > (- 1)){
                coupon.push(parseFloat(instrument_name[i].substring(0,1) + ".5")/100);
            }

            else if (instrument_name[i].search("Gilt") > (- 1)){
                coupon.push(parseFloat(instrument_name[i].substring(0,1) + ".5")/100);
            }

            else {
                coupon.push(0);
            }


        }


        for (i = 0; i < ISIN.length; i++){

            UkGilts.push(new Bonds(0,instrument_name[i],coupon[i],parseFloat(price[i]),new Date(maturity[i]),ISIN[i],"Aa1"));
        }



    }

});

$.ajax({
    url: "images/corp_data.xml",
    dataType: "xml",
    success: function (data) {
        var xml_object, prices, current_node, instrument_name, instr_length, ISIN, maturity, price,name, a, one ,var1_price, coupon,
            tenYearPoint, isinLength;
        instrument_name = [];
        price = [];
        ISIN = [];
        maturity = [];
        name = [];
        coupon = [];
        tenYearPoint = [];
        ratings = [];

        xml_object = $(data);


        prices = xml_object.find("Cell");

        prices.each(function () {
            // Make JQ object from child node:

            current_node = $(this);
            // Get one of it's attributes:


            instrument_name.push(current_node.text());


        });
        // instrument_name.splice(0,8);
        instr_length =instrument_name.length;

        for (i = 7; i < instr_length; i += 9 ){
            ISIN.push(instrument_name[i]);
        }


        for (i = 10; i < instr_length; i += 9 ){
            price.push(Math.round(parseFloat((instrument_name[i]))*100)/100);
        }

        for (i = 6; i < instr_length; i += 9 ){
            name.push(instrument_name[i]);
        }

        for (i = 8; i < instr_length; i += 9 ){
            coupon.push(parseFloat((instrument_name[i])/100));
        }
        for (i = 9; i < instr_length; i += 9 ){
            maturity.push((instrument_name[i]));
        }
        for (i = 12; i < instr_length; i += 9 ){
            ratings.push((instrument_name[i]));
        }




        isinLength = ISIN.length;

        for (i = 0; i < maturity.length; i++){
            if (new Date(maturity[i]) <= new Date(Today + 315569000000)) {
                tenYearPoint.push(maturity[i]);
            }
        }
        maturityLength = tenYearPoint.length;


        for (i = 0; i < isinLength; i++){

            corporate.push(new Bonds(0,name[i],coupon[i],price[i],new Date(maturity[i]),ISIN[i],ratings[i]));
        }
        for (i = 0; i < isinLength; i++){

            if (corporate[i].rating != "NR" &&
              corporate[i].rating != "Caa2" &&
              corporate[i].rating != "B2" &&
              corporate[i].rating != "B1" &&
              corporate[i].rating != "Ba1" &&
              corporate[i].rating != "Ba2" &&
              corporate[i].rating != "BB+" )
            {
                corporate_inv.push(new Bonds(0,name[i],coupon[i],price[i],new Date(maturity[i]),ISIN[i],ratings[i]));
            }


        }


    }

});




function eliminateDuplicates(arr) {
    var i,
        len=arr.length,
        out=[],
        obj={};

    for (i=0;i<len;i++) {
        obj[arr[i].name]= i;
    }
    return obj;
}

var selectNames = function (assetArray, bond){
    var i,
        len = assetArray.length,
        match;

    for (i=0; i < assetArray.length; i++){
        if (bond.name === assetArray[i].name) {
            match = true;

        }
    }
    return match;

};




var chooseAsset = function () {

    var typeOfBonds, bondType, asset;
    typeOfBonds = document.getElementById("bondtype");
    bondType = typeOfBonds.value;
    if (bondType === "0"){
        asset = corporate;
    }
    else if (bondType === "1")   {
        asset = UkGilts;
    }
    else  {
        asset = corporate_inv;
    }

    return asset;

};

var button = document.getElementById("findcashflows");

button.addEventListener(
    "click",
    function (event) {
        event.stopPropagation();
        findCashFlows(chooseAsset(),UkGilts);
    }
);
window.sr = new scrollReveal();

$(".scroll-button").on("click", function(){ //scroll button functionality

    var bondlist = $('#bondlist');
    var topPosition = bondlist.offset().top;

    $('html, body').animate({
        scrollTop: topPosition},1000);
    return false;
});
$(".scroll-button2").on("click", function(){ //scroll button functionality

    var bondlist2 = $('#bondlist2');
    var topPosition2 = bondlist2.offset().top;

    $('html, body').animate({
        scrollTop: topPosition2},1000);
    return false;
});

var faq = document.getElementById("faq");
faq.addEventListener("click", function(event){
    var marker = event.target.getAttribute("data-type");
    //var active = document.querySelectorAll(".x"+marker);
    var active = document.getElementById("x"+marker);

    active.classList.toggle("hide");
    //$('.x'+ marker).slideToggle(500);
});


function findCashFlows(treasury, UkGilts){



    var start_el = document.getElementById("start2");//first payment date for the annuity
    var start = parseInt(start_el.value);
    var startdate = new Date(Today + parseInt(start_el.value) * 31556900000); //calculating the date from the input value
    var end_el = document.getElementById("life2");//length of the annuity
    var end = parseInt(end_el.value);
    var enddate = new Date(Today + parseInt(end_el.value) * 31556900000);
    var amount_el=document.getElementById("amount2");//money to be invested
    var amount = parseInt(amount_el.value);
    var cashflowdates =[];
    var exception = [];
    var listDifference = 0;
    var treasurylist = [];
    var treasuryLength, couponFlowNewList, treasuryListLength, missingDates, accruedPrice,
        totalFlowNewList, totalFlowListLength, costofbonds, notionalFlowNewList,
        adjustment2, averageFlows, better, betterData, Betterchart, notionalPrice,
        outputlist, faulttext, lightbox, listEl, listElLength,li, index, itemPrice, bondObject, insertText,
        flowcalc, sumOfCashflows, annuity, difference, counter, nameMatch,treasuryNameList, match, matchPosition,out;

    for (i = start; i < start + end; i++) {
        cashflowdates.push(new Date (Today + i * 31556900000)); //get the dates of required cashflows
    }

    CashFlowDatesLength = cashflowdates.length;

    treasuryLength = treasury.length;

    Array.dim = function (dimension, initial){
        var a = [], i;
        for (i = 0; i < dimension; i += 1) {
            a[i] = initial;
        }
        return a;
    };


    couponFlowNewList = Array.dim(end, 0);

    for (i = 0; i < CashFlowDatesLength; i++){//allocate available bonds to the desired dates
        for (j = 0; j < treasuryLength; j++){

            if (treasury[j].maturity > cashflowdates[i].valueOf() - 15778450000 && treasury[j].maturity < cashflowdates[i].valueOf() + 15778450000 )
            {
                treasurylist.push(treasury[j]); break;
            }
        }
    }
    treasuryNameList = [];
    matchPosition = [];
    treasuryListLength = treasurylist.length;

    for (i = 0; i < treasuryListLength; i++){
        treasuryNameList.push(treasurylist[i].name);
    }

    nameMatch = eliminateDuplicates(treasurylist);

    treasuryList = [];
    matchPosition = [];

    var prop;
    for (prop in nameMatch){
        matchPosition.push(nameMatch[prop]);
    }


    for (i = 0; i < matchPosition.length; i++){
        treasuryList.push(treasurylist[matchPosition[i]]);
    }
    treasuryList.sort(function(a,b){
        return a.maturity - b.maturity;
    });


    treasurylist = treasuryList;

    treasuryListLength = treasurylist.length;

    exception =[];
    missingDates = [];

    if (treasuryListLength !== CashFlowDatesLength){

        for(i = 0; i < CashFlowDatesLength; i++){
            for(j = 0; j < treasuryListLength; j++){
                if (cashflowdates[i].valueOf() - 15778450000 < treasurylist[j].maturity && cashflowdates[i].valueOf() + 15778450000 > treasurylist[j].maturity){
                    exception.push(cashflowdates[i]);

                }

            }
        }

        missingDates = $(cashflowdates).not(exception).get();

        missingDatesLength = missingDates.length;

        for (i = 0; i < missingDatesLength; i++){
            for (j = 0; j < treasuryLength; j++){

                if (treasuryNameList.indexOf(treasury[j].name) < 0 && treasury[j].maturity > missingDates[i].valueOf() - 15778450000 && treasury[j].maturity < missingDates[i].valueOf() + 15778450000)
                {
                    treasurylist.push(treasury[j]);break;
                }

            }
        }

        treasurylist.sort(function(a,b){
            return a.maturity - b.maturity;
        });

        treasuryListLength = treasurylist.length;
    }



    exception =[];
    missingDates = [];

    if (treasuryListLength !== CashFlowDatesLength){

        for(i = 0; i < CashFlowDatesLength; i++){
            for(j = 0; j < treasuryListLength; j++){
                if (cashflowdates[i].valueOf() - 15778450000 < treasurylist[j].maturity && cashflowdates[i].valueOf() + 15778450000 > treasurylist[j].maturity){
                    exception.push(cashflowdates[i]);

                }

            }
        }

        missingDates = $(cashflowdates).not(exception).get();
        missingDatesLength = missingDates.length;
        UkGiltsLength = UkGilts.length;


        for (i = 0; i < missingDatesLength; i++){
            for (j = 0; j < UkGiltsLength; j++){

                if (UkGilts[j].maturity > missingDates[i].valueOf() - 15778450000 && UkGilts[j].maturity < missingDates[i].valueOf() + 15778450000){
                    treasurylist.push(UkGilts[j]); break;

                }
            }
        }

        treasurylist.sort(function(a,b){
            return a.maturity - b.maturity;
        });

        treasuryListLength = treasurylist.length;
    }

    // bond allocation to dates finishes here including adjustment if primary bondcurve has maturity gaps



    accruedPrice = [];


    for (prop in treasurylist){
        accruedPrice.push(treasurylist[prop].accrued() * 100);
    }


    for (i = 0 ; i < treasuryListLength; i++){
        treasurylist[i].notional = amount / end / (treasurylist[i].price + accruedPrice[i]) * 100;
    }

    // notional for bonds is allocated equally adjusted for bondprice

    //flowcalc function recalculates cashflows for every notional adjustment in do/while loop

    flowcalc = function (){
        couponFlowNewList = Array.dim(end, 0);

        for(j = 0; j < CashFlowDatesLength; j++){
            for (i = 0; i < treasuryListLength; i++){
                if (cashflowdates[j] !== undefined && treasurylist[i].maturity >= cashflowdates[j].valueOf() - 15778450000)
                {couponFlowNewList[j] += (treasurylist[i].couponflow());

                }

            }
        }


        //initial coupons are calculated

        notionalFlowNewList = Array.dim(end, 0);
        totalFlowNewList = Array.dim(end, 0);
        averageFlows = 0;

        for (i = 0; i < treasuryListLength; i++){
            notionalFlowNewList[i] += (treasurylist[i].notional);
        }

        for( i = 0; i < end; i++){
            totalFlowNewList[i] = notionalFlowNewList[i] + couponFlowNewList[i];
            averageFlows += totalFlowNewList[i];
        }

        //total cashflows are calculated

        totalFlowListLength = totalFlowNewList.length;

        costofbonds = 0;

        var prop;
        for(prop in treasurylist){

            costofbonds += treasurylist[prop].purchaseprice();
        }

        return [costofbonds, totalFlowNewList, averageFlows, couponFlowNewList, notionalFlowNewList];

    };


    // Finetuning of notional allocation in do/while loop:
    counter = 0;
    do  {

        adjustment2 = (amount - flowcalc()[0])/ end;

        for(i = 0; i < treasuryListLength; i++){
            treasurylist[i].notional = treasurylist[i].notional + adjustment2;
        }


        totalFlowListLength = flowcalc()[1].length;
        totalFlowNewList = flowcalc()[1];

        sumOfCashflows = 0;
        for (i = 0; i < totalFlowListLength; i++){

            sumOfCashflows += totalFlowNewList[i];

        }
        annuity = sumOfCashflows/totalFlowListLength; //initial cashflow increased/decreased again and then adjusted

        difference = [];
        for(i = 0; i < totalFlowListLength; i ++){
            difference.push(annuity - totalFlowNewList[i]);
        }

        for(i = 0; i < treasuryListLength; i++){
            treasurylist[i].notional = treasurylist[i].notional + difference[i];
        }

        counter ++;
    }
    while (flowcalc()[0] > amount * 1.01 || flowcalc()[0] < amount * .99);
    console.log(counter);

    //output of results including charts

    incomeEl = document.getElementById("income2");
    incomeSpan = incomeEl.querySelectorAll("span");
    spanLength = incomeSpan.length;
    incomeChart = incomeEl.querySelectorAll("canvas");
    canvasElLength = incomeChart.length;
    outputEl = document.getElementById("bondlist2");
    ulElement = outputEl.querySelectorAll("ul");
    ulElementLength = ulElement.length;
    couponFlowNewList = flowcalc()[3];
    notionalFlowNewList = flowcalc()[4];


    if (spanLength > 0){
        for(i = 0; i < spanLength; i++){ //loops remove any existing p or canvas elements from the dom
            incomeEl.removeChild(incomeSpan[i]);}
    }
    if (ulElementLength > 0){
        for(i = 0; i < ulElementLength; i++){ //loops remove any existing p or canvas elements from the dom
            outputEl.removeChild(ulElement[i]);}
    }
    if (canvasElLength > 0){
        for(i = 0; i < canvasElLength; i++){ //loops remove any existing p or canvas elements from the dom
            incomeEl.removeChild(incomeChart[i]);}
    }
    if ( end < 40){
        incomeEl.insertAdjacentHTML('afterbegin','<span>   Your average annual income is ' + Math.round(flowcalc()[2]/end/10)*10 + ' Pounds</span>');
        incomeEl.insertAdjacentHTML('beforeend', "<canvas id = 'outputchart2' ></canvas>");

        cashflowYear = [];

        for (i = 0; i < CashFlowDatesLength; i++){
            cashflowYear.push(cashflowdates[i].getFullYear());
        }


        betterData = {
            labels: [],
            datasets: [{label: "Principal",
                backgroundColor: "#9C50B5",
                borderColor: "#9C50B5",
                borderWidth: 1,
                scaleLabel: "<%= '  ' + value%>",
                data: []
            },
            {label: "Coupon",
                backgroundColor: "#1A8735",
                borderColor: "#1A8735",
                borderWidth: 1,
                scaleLabel: "<%= '  ' + value%>",
                data: []
            }
            ]
        };

        for(i = 0; i < end; i++){
            betterData.datasets[0].data.push(Math.round(notionalFlowNewList[i]));
            betterData.datasets[1].data.push(Math.round(couponFlowNewList[i]));
        }
        for(i = 0;i < end; i++){
            betterData.labels.push(cashflowYear[i]);
        }

        better = document.getElementById('outputchart2').getContext('2d');
        Betterchart = new Chart( better,{ type: "bar",
            data: betterData,
            options: { scales: { xAxes: [{ stacked: true,
                gridLines: {display:false},
            }],
            yAxes: [{ stacked: true,
                gridLines: {display:false}
            }]
            },
            legend: { display: true,
                labels:{boxWidth: 10},
                position: "bottom"
            }
            }
        });

        notionalPrice = [];


        for(prop in treasurylist){
            notionalPrice.push("<li>Bondnotional ");
            notionalPrice.push(Math.round(treasurylist[prop].notional/10)*10);
            notionalPrice.push(" - of the ");
            notionalPrice.push(treasurylist[prop].name);
            notionalPrice.push(" - Maturity ");
            notionalPrice.push(treasurylist[prop].maturity.toDateString());
            notionalPrice.push(" - Price of ");
            notionalPrice.push(treasurylist[prop].price);
            notionalPrice.push("</li>");
            notionalPrice.push("\n");
        }

        notionalPrice.unshift("<ul>");
        notionalPrice.push("</ul>");

        outputlist = [];

        outputlist = notionalPrice.join("");

        outputEl.insertAdjacentHTML("beforeend",outputlist);

    }
    else{ faulttext = "Maturity has to be 35 years maximum and start date in one year"+'<img src="images/sadface.svg">';
        incomeEl.insertAdjacentHTML('afterbegin',"<span>"+ faulttext + "</span>");
    }


    $("li").on("click",function(event){
        lightbox = document.getElementById("textbox");
        listEl = lightbox.querySelectorAll("ul");
        listElLength = listEl.length;
        for(i = 0; i < listElLength; i++){
            if(listElLength > 0){
                lightbox.removeChild(listEl[i]);
            }
        }

        // info box on bond display
        $(".lightbox").fadeIn();

        li = event.target.textContent;
        index = li.indexOf("Price");
        itemPrice = parseFloat(li.substring(index + 9, index + 15));
        console.log(itemPrice);
        bondObject = [];
        insertText =[];
        var prop;
        for (prop in treasurylist){
            if (treasurylist[prop].price == itemPrice){

                bondObject.push("<ul>");
                bondObject.push("<p>Bond Information</p>");
                bondObject.push("<li> Borrower: " + treasurylist[prop].name + "</li>");
                bondObject.push("<li> Security Number: " + treasurylist[prop].ISIN + "</li>");
                //bondObject.push("<li> Coupon: " + treasurylist[prop].coupon*100 + "%</li>");
                bondObject.push("<li> Annual Coupon: " + treasurylist[prop].couponflow() + " Pounds</li>");
                bondObject.push("<li> Maturity: " + (treasurylist[prop].maturity).toDateString() + "</li>");
                bondObject.push("<li> Notional: " + (Math.round(treasurylist[prop].notional/10)*10) + " Pounds</li>");
                bondObject.push("<li> Credit Rating: " + treasurylist[prop].rating + "</li>");
                bondObject.push("</ul>");

            }

        }

        insertText = bondObject.join('');

        lightbox.insertAdjacentHTML('afterbegin',insertText);

    });

    $(".lightbox img").on("click",function(){
        $(".lightbox").fadeOut();
    });
    $(document).on("scroll",function(){
        var distanceFromTop = $(document).scrollTop();

        if(distanceFromTop > 7750 || distanceFromTop < 6100){

            $(".lightbox").fadeOut();

        }
    });
}
