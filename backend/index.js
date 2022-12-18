const StreamChat = require("stream-chat").StreamChat;
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAIAPIKEY,
  });
const openai = new OpenAIApi(configuration);

const hello = async () => {
  const client = await StreamChat.getInstance(process.env.STREAMAPIKEY);
  const User2 = {
    id: "AI_TUTOR",
    name: "AI_TUTOR",
    image: "https://lh3.googleusercontent.com/fife/AAbDypCIRZGhGRMHZW3hS6s7nm4OoYSouOMwsNfXvygp82F5BSA_iMJE-TIGOygRzPtq3GtIfJ_3Yomyj3khfIGW2KRNTPa2zwyALB0j6n7caN_wjfPrt_dEH8hTD5tH7hYGo2o9fr8kO3c9ye8JIWYb7NfanGi6jtA4mbLiQSqvwaGSwyWmCHYjP0CCFjPtaM_psg4ph6PtHjthF-sPnYJnJ8TgSeeN9U2-f0aizBk5tPWCAXjsPpFUkqdsRP4AKpyLoa8u-Aql9N6m5-ee7kCjpPc2_FUCSOCPTNIkqt52zX97y7bi0oKi8RSAhLV77gxjYUQziyUAlZ6ovt9d40zC3vqw0CJjprLl52KIX4hp-q6lWE_NRK0RseXKmuT7CLvTpOvroTO4J-kV1wHPxGlH37ltlM5gv9LI0FdmelwQ4qUFUtzvYYlOu6J6miwa92frNu6OQsGlOgjOJJnRKvf5m-YKjeVaufZ0XaPrdUQ4faHu2e70SM8QBkxKhPQPuv7hfvnGdHaBrwWSqiOtoFvN1yO1YLf49NWnkghUKuw_mILRU2PIjwdJTDZUgXlJarYR0fpER32NTApxSwyXDpvWCMmG2zCUhKUQ5H1imukGmAHu_E8uNSr3slJ2POJoWuRkqTuPOVfJW6tO-NGe5eqOVuCLcegZGA5W07DUwa_1h4tJjDL06kugUkBMMDm9uTLraVJAbJ659OG33zWjRY20C3cjerkv2zoXlsqgGW-Oh4mx-RUuSbDaiIY4ODL3EW4d5Zk6-zavpvL8Z3zyFFoMAlAroaexBDQ7WwPRRuFEFXZaGV_usv1LUdgEr5EwGv97iwoaPSDNK4Pz9gJ6e90s0tH_vsYqKNZ6TA0heMfq0dn0soB1N5y0qRHgq7DxJJdKEJjZ5Rj40TphFLjIurTKUGfBinPbQju6liRMeRv_ACgXIYbDF1kdm21k86aWypi0GZR_rw=w2880-h1650",
  };
  client.connectUser(User2, client.devToken(User2.id));
  const channel = await client.channel("team", "devTutor");

  channel.on("message.new", async (event) => {
    if (event.user.id=="Bablu") {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` Converstion between a senior developer and an intern,developer is a prodigy and helps intern regarding his doubts in steps manner, ${event.message.text} is a doubt by intern,the developer answers as follows Senior Developer:"Hi there Intern! `,
        temperature: 0.9,
        max_tokens: 250,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });
    const res1 = await channel.sendMessage({
        text:res.data.choices[0].text
    });
    console.log(res1)
    }

  });
  const state = await channel.watch();
  console.log(state.messages);
};
hello();
