# FAQ | Frequently Asked Questions {#intro}

[[toc]]

## Does AirCode need to be paid for? What is the price plan? {#pricing}

We are committed to offering a Free plan for long-term trial purposes. To review the usage restrictions associated with the Free plan, kindly refer to the [Resource Limits - Monthly Usage Limit](/about/limits#monthly-usage) section. For professional users and commercial applications, we provide paid Professional and Team plans. For comprehensive details, please explore our [AirCode Pricing Page](https://aircode.io/pricing). Should you have any inquiries concerning payments or plan options, do not hesitate to reach out to us for assistance at [support@aircode.io](mailto:support@aircode.io).

## How do I find the App ID for my AirCode application? {#app-id}

You can view the App ID for your AirCode application in its settings window. To do so, access the corresponding application page and click on the application name. This will open the App Settings dialog box where you can easily locate and click on the App ID to copy it.

<ACImage src="/_images/1681195076163.png" mode="light" />
<ACImage src="/_images/1681195131773.png" mode="dark" />

## How to invoke other functions from a cloud function? {#invoke-other-functions}

For a function in the same App, you can load it through `require`, refer to [Load Other Functions](/guide/functions/require). If you want to invoke cloud functions of other Apps, you can access them directly through HTTP, refer to [Invoke Functions](/guide/functions/invoke).

## Does AirCode has a database and file storage capabilities? {#database-and-file-storage}

Yes, in AirCode's cloud functions, you can directly access the database through `aircode.db` and implement file uploads through `aircode.files`. Refer to [Database Introduction](/getting-started/database) and [File Storage Introduction](/getting-started/files).

## How to connect with webhooks of other systems? {#how-to-connect-webhook}

Each deployed cloud function generates a URL address, accessed directly via HTTP. You can paste this address into the webhook of the corresponding system so that when a relevant event occurs, the system will send an HTTP request to this address.

## Can cloud functions be called by scheduled tasks? {#scheduled-tasks}

Yes, AirCode provides a simple way to configure scheduled tasks to call cloud functions without the need to write Cronjob expressions. Refer to [Scheduled Tasks](/guide/functions/scheduled-tasks).

## How is a function's execution time calculated? Does the function run continuously? {#how-to-calculate-execution-runtime}

The execution time of a cloud function represents the duration from when a request is received to when the result is returned. AirCode's cloud functions dynamically scale based on the number of incoming requests, which means they only run during active requests and do not calculate execution time when idle.

Furthermore, there is a maximum execution time allotted for each individual request. If this limit is exceeded, the function will be forcibly terminated to prevent endless execution due to coding errors. For additional details, please refer to [Cloud Functions Runtime - Timeout](/reference/server/functions-runtime#execution-timeout).

## What is the time zone of AirCode cloud functions, and how do I handle different time zone issues? {#timezone}

In AirCode, the time zone for cloud functions is UTC±0, which is Greenwich Mean Time (GMT). To handle different time zone issues, you can use libraries such as [dayjs](https://day.js.org/).

For more information, please refer to the following guide:
- For handling time zone issues in cloud functions, see [Develop Online - Timezone](/guide/functions/development#timezone).
- For querying databases using time ranges, see [Find Data - Query by Time Range](/guide/database/find#date).

## How to resolve the `Cannot find module 'xxx'` error? {#cannot-find-module}

If you encounter a `Cannot find module 'xxx'` error while debugging or running cloud functions, it indicates that the corresponding module is not installed correctly. You can resolve this issue by installing the module in the **Dependencies** located in the lower left corner of the in-browser editor. For more information, please refer to [Using NPM to manage dependencies](/guide/functions/npm).

::: tip Note
The 'xxx' here is just an example, the error message will include the specific module name, such as `Cannot find module 'openai'`.
:::
