import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        data:{
            id:null,
            tag:null,
            catalogueName:null,
            skuId:null,
            dealPrice:null,
            moq:null,
            commissionPercent:null,
            campaignName:null,
            campaignType:null,
            campaignDescription:null,
            couponCode:null,
            isActive:null,
            startTime:null,
            endTime:null,
            priority:null,
            createdAt:null,
            minCartValue:null,
            clubbingKey:null,
            useCaseFilter:null,
            disallowed:null,
        },
        editing:false,
        row:[]
    }
})