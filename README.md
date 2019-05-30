# annuitybuilder_original
project finalised summer 2016 - annuity-builder

## Overview ##

I built this app as part of a business idea to give retirees who are interested to receive a regular income
over an extended period a tool to build a income producing portfolio. The tool has a calculator that takes some inputs such
as length of income required and amount invested initially and then produces an income based on risk appetite as well as a
suggested portfolio with further information about the bond portfolio chosen.

## Technology ##

I used HTML/CSS as well as Javascript for the interactive part of the app. I made some limited use of Jquery for AJAX calls
and fadeIn/fadeOut of information windows as well as Chart.js and scrollreveal.

The main interactive functionality utilises the prototype pattern to build bond objects from market information that is
contained in xml files. The Ajax call retrieves information such as bond maturity, coupon, issuer from the xml file and
uses that information to build a bond object for every bond using the prototype method. This bond object is then used to
find the optimal portfolio based on the user requirements.

Scrollreveal is utilised throughout to improve the website appearance

CHART.js is used to dynamically display cashflow as part of the user results

## How to use ##

To run the project install http-server globally:

npm install http-server -g

then run the server with:

http-server
