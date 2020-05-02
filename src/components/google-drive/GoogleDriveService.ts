const rootFolderName = "WebPad";

export class GoogleDriveService {

  async listFiles() : Promise<string[] | undefined> {
    let rootFolderId = await this.getRootFolder();
    var response = await gapi.client.drive.files.list({
      "pageSize": 10,
      "fields": "nextPageToken, files(id, name)",
      "q": `'${rootFolderId}' in parents`
    });
    var files = response.result.files || [];
    var result = files.map(file => file.name || "");
    return result;
  }

  async getRootFolder() : Promise<string | undefined> {
    var response = await gapi.client.drive.files.list({
      "fields": "files(id, name)",
      "q": `name='${rootFolderName}' and mimeType='application/vnd.google-apps.folder'`
    });

    if (response.result.files?.length == 0) {
      let folderMetadata = {
        name: rootFolderName,
        mimeType: "application/vnd.google-apps.folder",
      }
      var rootFolder = await gapi.client.drive.files.create({
        resource: folderMetadata,
        fields: "id"
      });
      return rootFolder.result.id;

    } else {
      return response.result.files![0].id;
    }
  }
};

const googleDriveService = new GoogleDriveService();

export default googleDriveService;