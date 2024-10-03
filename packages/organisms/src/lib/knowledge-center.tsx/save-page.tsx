import React from 'react';
import {
  Button,
  Typography,
  Stack,
  Paper,
  TextField,
} from '@my-workspace/packages-atoms';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormData = {
  title: string;
  description: string;
  member: string;
  language: string;
};

const saveSchema = yup
  .object()
  .shape({
    title: yup.string().required(),
    description: yup.string().max(100).required(),
    member: yup.string().required(),
    language: yup.string().required(),
  })
  .required();

const SavePage = () => {
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(saveSchema),
  });

  const descriptionValue = methods.watch('description', '');

  const onSubmitWrapper = async (data: FormData) => {
    methods.clearErrors();
    // try {
    //   await onSubmit(data);
    // } catch (e: any) {
    //   methods.setError('root', {
    //     message: e.message,
    //   });
    // }
  };

  return (
    <FormProvider {...methods}>
      <Paper variant="containerTwo">
        <Stack direction={'column'} spacing={'10px'}>
          <Typography variant="h3">{t('save_project')}</Typography>

          <form onSubmit={methods.handleSubmit(onSubmitWrapper)}>
            <Stack direction={'column'}>
              <TextField
                name="title"
                label="Title"
                placeholder="Enter the title"
                size="small"
              />
              <TextField
                name="description"
                label="Description"
                placeholder="Describe your project in a few words"
                size="small"
                multiline
                minRows={4}
              />
              <Typography variant="h6" mt={'-5px'} ml={'5px'}>
                {`${descriptionValue.length}/100`}
              </Typography>
              <TextField
                name="member"
                label="Team members"
                size="small"
                select
              ></TextField>
              <TextField
                name="language"
                label="Language"
                select
                size="small"
              ></TextField>
            </Stack>
          </form>

          <Stack
            direction={'column'}
            height={'auto'}
            justifyContent={'flex-end'}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Button
                variant="button1"
                disabled={methods.formState.isSubmitting}
              >
                <Typography variant="button">{t('save_project')}</Typography>
              </Button>
              <Button>
                <Typography variant="button">{t('cancel')}</Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </FormProvider>
  );
};

export { SavePage };
