
var div;

/* map
kulcs td-nek az id
értéke: kártya tulajdonságai
*/

var kartyak = new Map();
var szamlalo = 0;

// Stopper változók
var stopperId;
var stopperSzamlalo = 0;
var talaltParokSzama = 0;
function jatekter1gen()
{
    var div = document.createElement("div");
    div.id="jatekter";
    div.className="center";
}
function jatekter2gen()
{
    var div = document.createElement("div");
    div.id="jatekter";
    div.className="center";
    var div2 = document.createElement("div");
    div2.id="jatekter2";
    div.className="center";
}
function tombFeltoltes() {
    for (let i = 0; i < 10; i++)
    {
        const kartya = {
            ertek: i,
            aktFel: false,
            talalt: false,
            kep: undefined,
        };
        kartyak.set(i*2, kartya);
        // kartyak[i] = kartya;
        
        const kartya2 = {
            ertek: i,
            aktFel: false,
            talalt: false,
            kep: undefined,
        };

        kartyak.set(i*2+1, kartya2);
        // kartyak[i+10] = kartya;
    }
}

function veletlenszam(also, felso) {
    return Math.floor(Math.random()*(felso-also+1)+also);
}

function keveres()
{
    for (let i = 0; i < 50; i++)
    {
        let vi1 = veletlenszam(0, kartyak.size-1)
        let vi2 = veletlenszam(0, kartyak.size-1)
        let sv = kartyak.get(vi1);
        kartyak.set(vi1, kartyak.get(vi2));
        kartyak.set(vi2, sv);
        // sv = kartyak[vi1];
        // kartyak[vi1] = kartyak[vi2];
        // kartyak[vi2] = sv;
    }
}

function megjelenites()
{
    const jatekter = document.getElementById("jatekter");
    for (const [key ,kartya] of kartyak)
    {
        let kep = document.createElement("img");
        if (kartya.aktFel)
        {
            kep.src = "img/" + kartya.ertek + ".png";
            
        }
        else
        {
            kep.src = "img/hatter.png";
        }
        kep.setAttribute("onclick", "megfordul(" + key + ")");
        kep.style.width = "210px";
        kep.style.height = "160px";
        kep.id="kartya";
        kartya.kep = kep;
        jatekter.appendChild(kartya.kep);
        if((key + 1) % 4 == 0)
        {
            jatekter.appendChild(document.createElement("br"));
        }
    }
}

function visszafordit(kulcsok)
{
    kartyak.get(kulcsok[0]).aktFel=false;
    kartyak.get(kulcsok[0]).kep.src="img/hatter.png";
    kartyak.get(kulcsok[1]).aktFel=false;
    kartyak.get(kulcsok[1]).kep.src="img/hatter.png";
}

function aktualisanfelforditottmemoriakartyalapokszamakivalogatasa()
{
    let kulcsok = new Array();
    for (const [kulcs, ertek] of kartyak)
    {
        if (ertek.aktFel)
        {
            kulcsok.push(kulcs);
        }
    }
    return kulcsok;
}

function megfordul(key)
{
    //console.log(kartyak.get(key));
    if (!kartyak.get(key).aktFel && !kartyak.get(key).talalt && aktualisanfelforditottmemoriakartyalapokszamakivalogatasa().length < 2)
    {
        kartyak.get(key).kep.src = "img/" + kartyak.get(key).ertek + ".png";
        kartyak.get(key).aktFel = true;
        szamlalo++;
        if (szamlalo % 2 == 0)
        {
            let kulcsok = aktualisanfelforditottmemoriakartyalapokszamakivalogatasa();
            if (kartyak.get(kulcsok[0]).ertek == kartyak.get(kulcsok[1]).ertek)
            {
                kartyak.get(kulcsok[0]).aktFel=false;
                kartyak.get(kulcsok[0]).talalt=true;
                kartyak.get(kulcsok[1]).aktFel=false;
                kartyak.get(kulcsok[1]).talalt=true;

            }
            else
            {
                setTimeout(visszafordit, 500, kulcsok)
            }
        }
    }
}
function p2split()
{

}
function invshow()
{
    var invdiv = document.createElement("div");
    invdiv.id="inventory";
}
function p1()
{
    jatekter1gen();
    tombFeltoltes();
    keveres();
    console.log(kartyak);
    megjelenites();
}

function inventory()
{
    invshow();
}


