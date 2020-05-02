

export class GoogleDriveService {

  async listFiles() : Promise<string[]> {
    var response = await gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    });
    var files = response.result.files || [];
    var result = files.map(file => file.name || "");
    return result;
  }
};

const googleDriveService = new GoogleDriveService();

export default googleDriveService;