fetch("https://api2.binance.com/api/v3/ticker/24hr")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    const logos = [
      "images/ethereum.png",
      "images/litecoin.png",
      "images/binance.png",
      "images/bitcoin.png",
      "images/qtum.png",
      "images/eos.png",
      "images/snt.png",
      "images/bnt.png",
      "images/bcc.png",
      "images/gas.png",
      "images/bnb.png",
      "images/BTCUSDT.png",
      "images/ETHUSDT.png",
      "images/HSRBTC.png",
      "images/OAXETH.png",
      "images/DNTETH.png",
      "images/MCOETH.png",
      "images/ICNETH.png",
      "images/MCOBTC.png",
      "images/WTCBTC.png",
    ];
    element = json;
    localStorage.setItem("array", JSON.stringify(element));
    for (let index = 0; index < 20; index++) {
      display(element[index], logos[index], index);
    }

    for (let index = 0; index < 100; index++) {
      increse(element[index]);
    }
    for (let index = 0; index < 100; index++) {
      decrease(element[index]);
    }
    const NCCI = JSON.parse(localStorage.getItem("NCCI"))
    if(NCCI){
      for (let index = 0; index < NCCI.length; index++) {
        display(NCCI[index], logos[index], index);
        
      }
    }

    const check = localStorage.getItem("CCI");
    let array2 = [];
    let obj;
    for (let index = 0; index < 20; index++) {
      if (check) {
        array2 = JSON.parse(localStorage.getItem("CCI"));
        obj = {
          id: index,
          symbol: element[index].symbol,
          img: logos[index],
          highPrice: element[index].highPrice,
          lastPrice: element[index].lastPrice,
          priceChangePercent: element[index].priceChangePercent,
          weightedAvgPrice: element[index].weightedAvgPrice,
          quoteVolume: element[index].quoteVolume,
        };
        array2.push(obj);
        localStorage.setItem("CCI", JSON.stringify(array2));
      } else
        obj = {
          id: index,
          symbol: element[index].symbol,
          img: logos[index],
          highPrice: element[index].highPrice,
          lastPrice: element[index].lastPrice,
          priceChangePercent: element[index].priceChangePercent,
          weightedAvgPrice: element[index].weightedAvgPrice,
          quoteVolume: element[index].quoteVolume,
        };
      array2.push(obj);
      localStorage.setItem("CCI", JSON.stringify(array2));
    }
  });

display;
function display(array, logos, id) {
  // vairables
  const parent = document.querySelector(".container");
  const row = document.createElement("div");
  const image = document.createElement("img");
  const name = document.createElement("p");
  let quoteVolume_dis = document.createElement("p");
  const priceChange_dis = document.createElement("p");
  const status = document.createElement("p");
  const btn = document.createElement("button");
  const like = document.createElement("button");
  const divbtns = document.createElement("div");
  const quoteVolume_dis_parsed = document.createElement("p");
  const deletbtn = document.createElement("button");
  const editbtn = document.createElement("button");

  // assignments classes values and parsing
  divbtns.className = "row-buttons";
  row.className = "row";
  row.id = "CCI";
  status.id = "status";
  image.src = logos;
  name.innerText = array.symbol;
  quoteVolume_dis = parseFloat(array.quoteVolume);
  quoteVolume_dis = quoteVolume_dis.toFixed(0);
  quoteVolume_dis_parsed.innerText =
    "number of units traded is: " + quoteVolume_dis;
  btn.className = "btn button1";
  btn.innerText = "details";
  like.className = "btn button1";
  like.innerText = "Like";
  deletbtn.className = "btn button1";
  deletbtn.innerText = "delete";
  deletbtn.id = "delete";
  editbtn.className = "btn button1";
  editbtn.innerText = "edit";
  editbtn.id = "edit";

  //funcion to call popup
  btn.onclick = function () {
    popup(
      id,
      array.symbol,
      array.highPrice,
      array.lastPrice,
      array.priceChangePercent,
      array.weightedAvgPrice,
      logos,
      quoteVolume_dis
    );
  };

  //to show which increase and decrease
  if (array.priceChange > 0) {
    priceChange_dis.style.color = "#1a8a10";
  }
  if (array.priceChange < 0) {
    priceChange_dis.style.color = "red ";
  }

  priceChange_dis.innerText = array.priceChangePercent + "%";
  like.onclick = function () {
    fav(
      id,
      array.symbol,
      array.highPrice,
      array.lastPrice,
      array.priceChangePercent,
      array.weightedAvgPrice,
      logos,
      quoteVolume_dis
    );
    editbtn.onclick = function() {
      edit(id,
        array.symbol,
        array.highPrice,
        array.lastPrice,
        array.priceChangePercent,
        array.weightedAvgPrice,
        logos,
        quoteVolume_dis)
          }
    like.style.backgroundColor = "#333";
    like.style.color = "#ffc100";
    like.innerText = "LIKED!";
  };
  status.innerText = "increase";
  //   append
  row.append(image);
  row.append(name);
  row.append(quoteVolume_dis_parsed);
  row.append(priceChange_dis);
  row.append(status);
  divbtns.append(btn);
  divbtns.append(like);
  divbtns.append(deletbtn);
  divbtns.append(editbtn);
  row.append(divbtns);
  parent.append(row);
}
function validate() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (username == "Fahad" && password == "123") {
    location.href = "homepage_loged.html"; // Redirecting to other page.
  }
  else{
    alert("Username or passwors is wrong")
  }
}

//create pop up features
function popup(
  id,
  symbol,
  highPrice,
  lastPrice,
  priceChangePercent,
  weightedAvgPrice,
  img,
  quoteVolume
) {
  const parent = document.querySelector("#id01");
  parent.style.display = "block";

  const row = document.querySelector(".pop-up-form");
  const p1 = document.createElement("img");
  const name = document.createElement("p");
  let quoteVolume_pop = document.createElement("p");
  const highPrice_pop = document.createElement("p");
  const lastPrice_pop = document.createElement("p");
  const priceChangePercent_pop = document.createElement("p");
  const weightedAvgPrice_pop = document.createElement("p");
  p1.src = img;
  name.innerText = "Name of crypto coin: " + symbol;
  quoteVolume_pop.innerText = "Quote volume: " + quoteVolume;
  highPrice_pop.innerText = "High Price: " + highPrice;
  lastPrice_pop.innerText = "Last Price: " + lastPrice;
  priceChangePercent_pop.innerText =
    "price Change Percent: " + priceChangePercent + "%";
  weightedAvgPrice_pop.innerText = "weighted Avrage Price: " + weightedAvgPrice;
  row.append(p1);
  row.append(name);
  row.append(quoteVolume_pop);
  row.append(highPrice_pop);
  row.append(lastPrice_pop);
  row.append(priceChangePercent_pop);
  row.append(weightedAvgPrice_pop);
  parent.append(row);
}

//set fav CC in localstroge
function fav(
  id,
  symbol,
  highPrice,
  lastPrice,
  priceChangePercent,
  weightedAvgPrice,
  img,
  quoteVolume
) {
  const check = localStorage.getItem("fav");
  const firstArray = [];
  let secondtArray = [];
  if (check) {
    secondtArray = JSON.parse(localStorage.getItem("fav"));
    for (let index = 0; index < secondtArray.length; index++) {
      if (secondtArray[index].id == id) {
        alert("you already add this coins to fav");
        return;
      }
    }
    secondtArray.push({
      id: id,
      symbol: symbol,
      highPrice: highPrice,
      lastPrice: lastPrice,
      priceChangePercent: priceChangePercent,
      weightedAvgPrice: weightedAvgPrice,
      img: img,
      quoteVolume: quoteVolume,
    });
    localStorage.setItem("fav", JSON.stringify(secondtArray));
  } else {
    secondtArray.push({
      id: id,
      symbol: symbol,
      highPrice: highPrice,
      lastPrice: lastPrice,
      priceChangePercent: priceChangePercent,
      weightedAvgPrice: weightedAvgPrice,
      img: img,
      quoteVolume: quoteVolume,
    });
    localStorage.setItem("fav", JSON.stringify(secondtArray));
  }
}

//display fav CC in side bar
function displayFav() {
  const check = JSON.parse(localStorage.getItem("fav"));
  if (check) {
    console.log("cheak " + check);

    for (let index = 0; index < check.length; index++) {
      const parent = document.querySelector("#fav-container");
      const row = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("p");
      const priceChangePercent = document.createElement("p");

      row.id = "#fav";
      row.className = "favGrid";
      image.src = check[index].img;
      name.innerText = check[index].symbol;
      if (priceChangePercent > 0) {
        priceChangePercent.style.color = "#1a8a10";
      }
      if (priceChangePercent < 0) {
        priceChangePercent.style.color = "red";
      }
      priceChangePercent.innerText = check[index].priceChangePercent + "%";

      row.append(image);
      row.append(name);
      row.append(priceChangePercent);
      parent.append(row);
    }
  }
}
displayFav();

function increse(array) {
  const check = JSON.parse(localStorage.getItem("fav"));

  if (array.priceChangePercent > 0) {
    const parent = document.querySelector("#changed-increase");
    const row = document.createElement("div");
    const name = document.createElement("p");
    const priceChangePercent = document.createElement("p");

    row.className = "incGrid";
    name.innerText = array.symbol;

    priceChangePercent.style.color = "#1a8a10";
    priceChangePercent.innerText = array.priceChangePercent + "%";

    row.append(name);
    row.append(priceChangePercent);
    parent.append(row);
  }
}

function decrease(array) {
  if (array.priceChangePercent < 0) {
    const parent = document.querySelector("#changed-decrease");
    const row = document.createElement("div");
    const name = document.createElement("p");
    const priceChangePercent = document.createElement("p");

    row.className = "incGrid";
    name.innerText = array.symbol;

    priceChangePercent.style.color = "red";
    priceChangePercent.innerText = array.priceChangePercent + "%";

    row.append(name);
    row.append(priceChangePercent);
    parent.append(row);
  }
}

function create() {
  const symbol = document.getElementById("Symbel").value;
  const quoteVolume = document.getElementById("valume").value;
  const highprice = document.getElementById("highPrice").value;
  const lastPrice = document.getElementById("lastPrice").value;
  const Percent = document.getElementById("percent").value;
  const img = document.getElementById("img").value;
  const v = document.getElementById("weightedAvgPrice").value;
 

  const check = localStorage.getItem("NCCI");
  let array2 = [];
  let obj;
  
    if (check) {
      array2 = JSON.parse(localStorage.getItem("NCCI"));
      obj = {
        symbol: symbol,
        img: img,
        highPrice: highprice,
        lastPrice: lastPrice,
        priceChangePercent: Percent,
        weightedAvgPrice: weightedAvgPrice,
        quoteVolume: quoteVolume,
      };
      array2.push(obj);
      localStorage.setItem("NCCI", JSON.stringify(array2));
      alert("You added ..." + symbol +" ....");
    } else
      obj = {
        symbol: symbol,
        img: img,
        highPrice: highprice,
        lastPrice: lastPrice,
        priceChangePercent: Percent,
        weightedAvgPrice: weightedAvgPrice,
        quoteVolume: quoteVolume,
      };
    array2.push(obj);
    localStorage.setItem("NCCI", JSON.stringify(array2));
    alert("You added ..." + symbol +" ....");

  }

function edit(id,
  symbol,
  highPrice,
  lastPrice,
  priceChangePercent,
  weightedAvgPrice,
  img,
  quoteVolume) {
    // const id1 = document.getElementById("id").setAttribute('value',id);

    const symbol1 = document.getElementById("Symbel").setAttribute('value',symbol);
    console.log(symbol1);
  const quoteVolume1 = document.getElementById("valume").setAttribute('value',quoteVolume);
  console.log(quoteVolume1);

  const highprice1 = document.getElementById("highPrice").setAttribute('value',highPrice);
  const lastPrice1 = document.getElementById("lastPrice").setAttribute('value',lastPrice);
  const Percent1 = document.getElementById("percent").setAttribute('value',priceChangePercent);
  const img1 = document.getElementById("img").setAttribute('value',img);
  const v1 = document.getElementById("weightedAvgPrice").setAttribute('value',weightedAvgPrice);
  // console.log(symbol1);
  // symbol1.value=symbol


  const parent = document.querySelector("#id03");
  parent.style.display = "block";
  const row = document.querySelector(".pop-up-form");

  }

  function update() {
    const id1 = document.getElementById("id").value
    const symbol = document.getElementById("Symbel").value;
    const quoteVolume = document.getElementById("valume").value;
    const highprice = document.getElementById("highPrice").value;
    const lastPrice = document.getElementById("lastPrice").value;
    const Percent = document.getElementById("percent").value;
    const img = document.getElementById("img").value;
    const weightedAvgPrice = document.getElementById("weightedAvgPrice").value;
   
  
    let check = localStorage.getItem("CCI");
    let array2 = [];
    let obj;
    for (let index = 0; index < check.length; index++) {
      if(check[index].id==id){
         array2 = JSON.parse(localStorage.getItem("CCI"));
         
         obj = {
           id:id1,
          symbol: symbol,
          img: img,
          highPrice: highprice,
          lastPrice: lastPrice,
          priceChangePercent: Percent,
          weightedAvgPrice: weightedAvgPrice,
          quoteVolume: quoteVolume,
        };
        array2[index] = (obj);
        localStorage.setItem("CCI", JSON.stringify(array2));
        alert("You added ..." + symbol +" ....");
      }
      
    }
      if (check) {
        array2 = JSON.parse(localStorage.getItem("NCCI"));
        obj = {
          symbol: symbol,
          img: img,
          highPrice: highprice,
          lastPrice: lastPrice,
          priceChangePercent: Percent,
          weightedAvgPrice: weightedAvgPrice,
          quoteVolume: quoteVolume,
        };
        array2.push(obj);
        localStorage.setItem("NCCI", JSON.stringify(array2));
        alert("You added ..." + symbol +" ....");
      } else
        obj = {
          symbol: symbol,
          img: img,
          highPrice: highprice,
          lastPrice: lastPrice,
          priceChangePercent: Percent,
          weightedAvgPrice: weightedAvgPrice,
          quoteVolume: quoteVolume,
        };
      array2.push(obj);
      localStorage.setItem("NCCI", JSON.stringify(array2));
      alert("You added ..." + symbol +" ....");
  
    }
function remove() {}
