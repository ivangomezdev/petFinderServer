import algoliasearch from "algoliasearch";
import  {Sequelize} from "sequelize";


//algolia keys
const appID = "1D3OVPR4KC";
const apiKey = "0ae494c54715a6f5742aaad0252ceea7";


//sql db
export const sequelize = new Sequelize("postgresql://dbPrueba_owner:Hj0MYesx8rDk@ep-ancient-moon-a5fhma2p.us-east-2.aws.neon.tech/dbPrueba?sslmode=require");
//algolia
export const client = algoliasearch(appID, apiKey);
export const index = client.initIndex("mascotas");
