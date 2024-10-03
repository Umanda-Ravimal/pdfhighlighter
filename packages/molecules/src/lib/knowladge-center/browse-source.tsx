import {
  Box,
  Button,
  Stack,
  Typography,
  Link,
  Paper,
} from '@my-workspace/packages-atoms';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import { useProjectData, useSearchSourceStore, useSourceUrlStore } from '@my-workspace/packages-zustand';
import { useSourceService } from '@my-workspace/packages-api';
import { v4 as uuidv4 } from 'uuid';
import { CircularWithValueLabel } from '@my-workspace/packages-molecules';

interface CustomFile {
  url: string;
  id: string;
  name: string;
  size: string;
  type: string;
}

const BrowseSource: React.FC = () => {
  const { t } = useTranslation();

  const setFiles = useSourceUrlStore(({ setFileData }) => setFileData);
  const { uploadSourceFile, fetchSources, createNewSources } = useSourceService();
  const setfetchSources = useSearchSourceStore(({ setfetchSources }) => setfetchSources);
  const activeProjectId = useProjectData(({ activeProjectId }) => activeProjectId);

  const [progress, setProgress] = useState<number>(0);
  // Upload files and get urls. and save files data in zustand store.
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      let index = 0;
      setProgress(0.1);
      const tick = parseFloat((100 / acceptedFiles.length).toFixed(1));
      const newFileData: CustomFile[] = [];
      for (let file of acceptedFiles) {
        try {
          if (activeProjectId) {
            const id = uuidv4();
            const projectId = activeProjectId;
            const url = await uploadSourceFile(file, projectId, id);
  
            const customFile: CustomFile = {
              name: file.name,
              size: file.size.toString(),
              type: file.type,
              url,
              id,
            };
            newFileData.push(customFile);
            index++;
            setProgress(parseFloat((tick * index).toFixed(1)));
            if (index === acceptedFiles.length) setProgress(0); 
          }
        } catch (error) {
          console.log(error);
        }
      }
      setFiles(newFileData);
    },
    [setFiles, uploadSourceFile]
  );

  const handleImportSource = useCallback(
    async (e: React.MouseEvent<HTMLParagraphElement>) => {
      const responce = await fetchSources();
      setfetchSources(responce);
      // e.preventDefault();
      // openDialog('https://localhost:3000/taskpane.html?page=import-page', {
      //   promptBeforeOpen: false,
      //   displayInIframe: true,
      //   width: 40,
      //   height: 50,
      // });
    },
    []
  );

  return (
    <Paper variant="browseBox">
      {progress > 0 ? (
        <CircularWithValueLabel value={progress} />
      ) : (
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Dropzone
            onDrop={onDrop}
            accept={{
              'application/pdf': ['.pdf'],
              'application/msword': ['.doc'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                ['.docx'],
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Stack>
                <Paper {...getRootProps()} variant="dashRoundBox">
                  <input {...getInputProps()} />
                  <Typography variant="body1">
                    {t('drag_drop')} {t('file_here_or')}{' '}
                    <Typography variant="body3">{t('browse')}</Typography>
                  </Typography>
                  <Typography variant="body2">
                    ({t('only_files_accepted')})
                  </Typography>
                </Paper>
                <Stack alignItems={'center'} justifyContent={'center'}>
                  <Button variant="button1" onClick={getRootProps().onClick}>
                    <Typography variant="button">
                      {t('upload_button')}
                    </Typography>
                  </Button>
                </Stack>
              </Stack>
            )}
          </Dropzone>
          <Typography
            variant="body1"
            onClick={handleImportSource}
            sx={{ cursor: 'pointer' }}
          >
            <Link>{t('import_knowledge_center')}</Link>
          </Typography>
        </Stack>
      )}
    </Paper>
  );
};

export { BrowseSource };
