const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ["https://plottrust.in","https://www.plottrust.in","http://localhost:3000"],
    methods: ["GET","POST"]
    }));
    app.use(express.json());

    const PLOTS = [
      {id:1,title:"Prime NA Plot - Dindori Road",village:"Pimpalgaon Baswant",taluka:"Dindori",district:"Nashik",surveyNo:"142/2A",gutNo:"142",type:"NA Plot",zone:"R-Zone",area:2400,areaUnit:"sqft",price:3600000,pricePerSqft:1500,asrRate:1200,stamp:6,rera:"P51600040C",road:"9 mtr DP Road",water:"MIDC Water Supply",facing:"East",score:92,checks:{title:true,govt:true,dispute:false,rera:true,mutation:true,encumbrance:true,zone:true,survey:true},seller:"Rajendra Patil",phone:"9876543210",listed:"2025-03-15",description:"Ready possession NA Plot. 7/12 clear, RERA registered."},
        {id:2,title:"Agriculture Land - Highway Touch",village:"Niphad Gaon",taluka:"Niphad",district:"Nashik",surveyNo:"88/1B",gutNo:"88",type:"Agriculture",zone:"Agriculture",area:1.5,areaUnit:"acre",price:2250000,pricePerSqft:null,asrRate:800,stamp:5,rera:null,road:"State Highway SH-10",water:"Canal + Borewell",facing:"South",score:78,checks:{title:true,govt:true,dispute:false,rera:false,mutation:true,encumbrance:true,zone:false,survey:true},seller:"Suresh Ahire",phone:"9765432109",listed:"2025-04-01",description:"1.5 Acre agriculture land on Highway."},
          {id:3,title:"Commercial Plot - Nashik Road",village:"Satpur MIDC Area",taluka:"Nashik",district:"Nashik",surveyNo:"CTS 245",gutNo:"N/A",type:"Commercial",zone:"Commercial",area:1800,areaUnit:"sqft",price:7200000,pricePerSqft:4000,asrRate:3500,stamp:6,rera:"P51600098D",road:"30 mtr Main Road",water:"Municipal Supply",facing:"North",score:95,checks:{title:true,govt:true,dispute:false,rera:true,mutation:true,encumbrance:false,zone:true,survey:true},seller:"Prakash Joshi",phone:"9654321098",listed:"2025-02-20",description:"Prime commercial plot in MIDC zone."},
            {id:4,title:"Residential Layout - Trimbak Road",village:"Anandwalli",taluka:"Nashik",district:"Nashik",surveyNo:"Plot 17, Sai Nagar",gutNo:"312",type:"Residential",zone:"R-Zone",area:1500,areaUnit:"sqft",price:2100000,pricePerSqft:1400,asrRate:1100,stamp:6,rera:"P51600111E",road:"12 mtr Internal Road",water:"NMC Water Line",facing:"West",score:88,checks:{title:true,govt:true,dispute:false,rera:true,mutation:false,encumbrance:true,zone:true,survey:true},seller:"Meena Kulkarni",phone:"9543210987",listed:"2025-03-28",description:"Ready layout plot in Anandwalli."},
              {id:5,title:"NA Plot Near Pune Highway",village:"Ozar",taluka:"Niphad",district:"Nashik",surveyNo:"56/3",gutNo:"56",type:"NA Plot",zone:"R-Zone",area:3000,areaUnit:"sqft",price:5400000,pricePerSqft:1800,asrRate:1500,stamp:6,rera:"P51600055F",road:"NH-60 Touch",water:"Borewell",facing:"North-East",score:85,checks:{title:true,govt:false,dispute:false,rera:true,mutation:true,encumbrance:true,zone:true,survey:false},seller:"Dilip Wagh",phone:"9432109876",listed:"2025-01-10",description:"3000 sqft NA Plot on National Highway."},
                {id:6,title:"Agriculture - Grape Farm Zone",village:"Chandwad",taluka:"Chandwad",district:"Nashik",surveyNo:"210/4A",gutNo:"210",type:"Agriculture",zone:"Green Zone",area:3,areaUnit:"acre",price:3900000,pricePerSqft:null,asrRate:600,stamp:5,rera:null,road:"Village Road",water:"Canal Irrigation",facing:"South-West",score:72,checks:{title:true,govt:true,dispute:true,rera:false,mutation:false,encumbrance:true,zone:false,survey:true},seller:"Vaibhav Sonawane",phone:"9321098765",listed:"2025-04-10",description:"3 Acre in Chandwad grape zone."},
                  {id:7,title:"Layout Plot - Shirdi Road",village:"Rahata",taluka:"Rahata",district:"Ahmednagar",surveyNo:"Plot 8, Shivneri Park",gutNo:"198",type:"Residential",zone:"R-Zone",area:1200,areaUnit:"sqft",price:1560000,pricePerSqft:1300,asrRate:1000,stamp:5,rera:"P52000022G",road:"15 mtr DP Road",water:"Grampanchayat Supply",facing:"East",score:90,checks:{title:true,govt:true,dispute:false,rera:true,mutation:true,encumbrance:true,zone:true,survey:false},seller:"Anil Deshmukh",phone:"9210987654",listed:"2025-03-05",description:"Premium plot near Shirdi. RERA approved."},
                    {id:8,title:"Commercial Corner Plot - Aurangabad",village:"Chikalthana MIDC",taluka:"Aurangabad",district:"Aurangabad",surveyNo:"CTS 88/7",gutNo:"N/A",type:"Commercial",zone:"Commercial",area:2500,areaUnit:"sqft",price:9500000,pricePerSqft:3800,asrRate:3200,stamp:6,rera:"P72200010H",road:"24 mtr Road + Corner",water:"MIDC Supply",facing:"North + East",score:93,checks:{title:true,govt:true,dispute:false,rera:true,mutation:true,encumbrance:false,zone:true,survey:true},seller:"Mohit Pawar",phone:"9109876543",listed:"2025-02-01",description:"Corner commercial plot in Aurangabad MIDC."}
                    ];

app.get("/", (req, res) => {
    res.json({status:"ok",service:"PlotTrust API",version:"1.0.0",plots:PLOTS.length});
});

app.get("/plots", (req, res) => {
    const {q,type,zone,district,maxPrice,minScore,sort} = req.query;
    let results = [...PLOTS];
    if (q) { const qry=q.toLowerCase(); results=results.filter(p=>(p.title+" "+p.village+" "+p.district+" "+p.type+" "+p.zone).toLowerCase().includes(qry)); }
    if (type) results=results.filter(p=>p.type===type);
    if (zone) results=results.filter(p=>p.zone===zone);
    if (district) results=results.filter(p=>p.district===district);
    if (maxPrice) results=results.filter(p=>p.price<=parseInt(maxPrice));
    if (minScore) results=results.filter(p=>p.score>=parseInt(minScore));
    if (sort==="price_asc") results.sort((a,b)=>a.price-b.price);
    else if (sort==="price_desc") results.sort((a,b)=>b.price-a.price);
    else if (sort==="newest") results.sort((a,b)=>new Date(b.listed)-new Date(a.listed));
    else results.sort((a,b)=>b.score-a.score);
    res.json({count:results.length,plots:results});
});

app.get("/plots/:id", (req, res) => {
    const id=parseInt(req.params.id);
    const plot=PLOTS.find(p=>p.id===id);
    if (!plot) return res.status(404).json({error:"Plot not found",id});
    res.json(plot);
});

app.use((req,res)=>{ res.status(404).json({error:"Route not found"}); });

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{ console.log("PlotTrust API running on port "+PORT); });
