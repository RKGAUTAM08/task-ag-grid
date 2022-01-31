const express = require('express');
var cors = require('cors');
const db= require('./database.js');

const app=express();

app.use(cors());
app.use(express.json());

async function fun(){
    const res = await db.query('SELECT * FROM tag_wise_price_drops2;')
}

app.listen(3000,() => {
    console.log('server is running at 3000');
})

app.get("/", async function(req, res) {
    const data= await db.query('SELECT * from tag_wise_price_drops2;');
    res.send(data.rows);
})

app.post("/add", async function(req,res) {
    const requestBody=req.body;
    const data = await db.query(`Insert into tag_wise_price_drops2(id, tag, catalogue_name, sku_id, deal_price, moq, commission_percent, campaign_name, campaign_type, campaign_description, coupan_code, is_active, start_time, end_time, priority, created_at,min_cart_value,clubbing_key,use_case_filter,disallowed)Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19);`, [requestBody.id,requestBody.tag,requestBody.catalogueName,requestBody.skuId,requestBody.dealPrice,requestBody.moq,requestBody.commissionPercent,requestBody.campaignName,requestBody.campaignType,requestBody.campaignDescription,requestBody.couponCode,requestBody.isActive,requestBody.startTime,requestBody.endTime,requestBody.priority,requestBody.createdAt,requestBody.minCartValue,requestBody.clubbingKey,requestBody.useCaseFilter,requestBody.disallowed]) 
    res.send("Added");
});

app.put("/update/:id", async function(req,res){
    const id=req.params.id;
    const requestBody=req.body;
    const data= await db.query(`UPDATE tag_wise_price_drops2 SET tag=$1,catalogue_name = $2, sku_id = $3, deal_price = $4, moq = $5, commission_percent =$6, campaign_name = $7, campaign_type = $8, campaign_description = $9, coupan_code = $10, is_active = $11, start_time = $12, end_time = $13, priority = $14, created_at = $15, min_cart_value = $16, clubbing_key = $17, use_case_filter = $18, disallowed = $19 WHERE id = $20`, [requestBody.tag,requestBody.catalogueName,requestBody.skuId,requestBody.dealPrice,requestBody.moq,requestBody.commissionPercent,requestBody.campaignName,requestBody.campaignType,requestBody.campaignDescription,requestBody.couponCode,requestBody.isActive,requestBody.startTime,requestBody.endTime,requestBody.priority,requestBody.createdAt,requestBody.minCartValue,requestBody.clubbingKey,requestBody.useCaseFilter,requestBody.disallowed,id])
    res.send("updated")
});

app.delete("/delete/:id", async function(req,res) {
    const id = req.params.id;
    const data = await db.query(`DELETE from tag_wise_price_drops2 where id=$1;`, [id])
    res.send("Deleted")
});