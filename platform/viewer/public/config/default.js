
window.config = {
  routerBasename: '/',
  showStudyList: true,
  extensions: [],
  modes: [],
  // below flag is for performance reasons, but it might not work for all servers
  omitQuotationForMultipartRequest: true,
  showLoadingIndicator: true,
  dataSources: [
    {
      friendlyName: 'Orthanc Server',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'Orthanc',
        wadoUriRoot: 'http://mohintreg.duckdns.org:2056/wado',
        qidoRoot: 'http://mohintreg.duckdns.org:2056/dicom-web',
        wadoRoot: 'http://mohintreg.duckdns.org:2056/dicom-web',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    },
  ],
  defaultDataSourceName: 'dicomweb',
};
