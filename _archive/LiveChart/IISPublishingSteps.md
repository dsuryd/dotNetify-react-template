## IIS Publishing Steps

### Prerequisite:

Install ASP.NET Core Module for IIS.  You can download it here:<br/>
https://github.com/dotnet/core/blob/master/release-notes/download-archives/2.0.0-download.md#windows-server-hosting

### Steps

1. Set __base href__ in index.html:
```html
<head>
   <meta http-equiv="content-type" content="text/html; charset=UTF8">
   <title>DotNetify-React</title>
   <base href="/<your_IIS_folder_name>/" />
</head>
...
```

2. Set __dotNetify.hubServerUrl__ in LiveChart.jsx:
```jsx
import React from 'react';
import dotnetify from 'dotnetify';
import { Bar } from 'react-chartjs';

dotnetify.hubServerUrl = "/<your_IIS_folder_name>/";

export default class LiveChart extends React.Component {
...
```

3. Rebuild the bundle with Webpack.

4. On Visual Studio menu, select __Build > Publish Live Chart__ option.  Choose Folder profile.

5. Copy the __bin/release/PublishOutput__ folder to your IIS /inetpub/wwwroot.   Rename the folder.

6. From IIS Manager, create an Application Pool for the new folder.

7. Run it: http:/localhost/<your_IIS_folder_name>.
