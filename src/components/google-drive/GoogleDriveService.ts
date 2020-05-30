const rootFolderName = "WebPad";

export class GoogleDriveService {

  async listFiles(rootFolderId: string) : Promise<string[] | undefined> {
    var response = await gapi.client.drive.files.list({
      "pageSize": 10,
      "fields": "nextPageToken, files(id, name)",
      "q": `'${rootFolderId}' in parents and trashed = false`
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

    if (response.result.files?.length === 0) {
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

  async createFile(rootFolderId: string, fileName: string) : Promise<string | undefined> {
    let folderMetadata = {
      name: fileName,
      mimeType: "text/plain",
      parents: [rootFolderId]
    }
    var response = await gapi.client.drive.files.create({
        resource: folderMetadata,
        fields: "id"
    });
    return response.result.id;
  }

  async deleteFile(fileId: string) : Promise<void> {
    await gapi.client.drive.files.delete({
      'fileId': fileId
    });
  }
};

const googleDriveService = new GoogleDriveService();

export default googleDriveService;