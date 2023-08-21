## ChatGPT Plugin for todolist

A simple chatGPT plugin for managing a to-do list, and it is made for further development.

You can use it as the start template and implement your plugin.

### Fork

As the plugin is developed and deployed on [AirCode](https://aircode.io/), all you need to do is click the following button to get a copy and start developing and deploying your own plugin:

[![Deploy with AirCode](https://aircode.io/aircode-deploy-button.svg)](https://aircode.io/dashboard?owner=AirCodeLabs&repo=aircode&branch=main&path=examples%2Fchatgpt-plugin-todolist&appname=TODOList)

### Update Domain

Once you have successfully copied the plugin, you can deploy it and get your app domain by clicking the "Deploy" button: 

![Alt text](https://github.com/AirCodeLabs/aircode/blob/chat/examples/chatgpt-plugin/image.png?raw%253Dtrue)

And **replace all `z58n74aig5.us.aircode.run` with your own domain in the files `.well-known/ai-plugin.json` and `openapi.yaml`**, for the case above is `x5a89yqe9z.us.aircode.run`. After you've done that, click deploy again (to update the domain info in your manifest file.)

### Install in ChatGPT 

Click `Develop your own plugin` (If you cannot see this, it indicates that you do not have developer access, you can apply it [here](https://openai.com/waitlist/plugins).):

![Alt text](https://github.com/AirCodeLabs/aircode/blob/chatgpt/examples/chatGPT-plugin/image-1.png?raw%253Dtrue) 

Input the domain of your app and click `Find manifest file`: 

![Alt text](https://github.com/AirCodeLabs/aircode/blob/chatgpt/examples/chatGPT-plugin/image-2.png?raw%25253Dtrue)

If everything goes well, you will see:

![Alt text](https://github.com/AirCodeLabs/aircode/blob/chatgpt/examples/chatGPT-plugin/image-3.png?raw%25253Dtrue)