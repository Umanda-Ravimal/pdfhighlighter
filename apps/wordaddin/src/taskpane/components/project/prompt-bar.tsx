import { Stack, Paper, InputBase, FormCheckboxInput, Button, Typography } from "@my-workspace/packages-atoms";
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  MoreHoriz as MoreHorizIcon,
  TerminalOutlined as TerminalOutlinedIcon,
  GraphicEqOutlined as GraphicEqOutlinedIcon,
  Language as LanguageIcon,
  Send as SendIcon,
  LinearScaleOutlined as LinearScaleOutlinedIcon,
} from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

import { useMetadataService } from "@my-workspace/packages-api";
import { useMetaDataStore } from "@my-workspace/packages-zustand";

const PromptBar = () => {
  const [value, setValue] = React.useState<number[]>([300, 2800]);
  const { t } = useTranslation();
  const methods = useForm();
  const [activeButton, setActiveButton] = React.useState<string | null>(null);

  const { generateMetaData } = useMetadataService();

  const setInputValue = useMetaDataStore(({ setInputValue }) => setInputValue);
  const inputValue = useMetaDataStore(({ inputValue }) => inputValue);
  const addResponceData = useMetaDataStore(({ addResponceData }) => addResponceData);
  const updateResponseData = useMetaDataStore(({ updateResponseData }) => updateResponseData);
  const blockId = useMetaDataStore(({ blockId }) => blockId);
  const selectedblockId = useMetaDataStore(({ selectedblockId }) => selectedblockId);

  const handleChange = useCallback((event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }, []);

  const handleButtonClick = useCallback((buttonName: string) => {
    setActiveButton(buttonName);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendClick = useCallback(async () => {
    console.log("Send button clicked with input value:", inputValue);
    const uniqueKey = uuidv4();
    let response = "";
    // addResponceData(inputValue, response, uniqueKey , blockId);
    setInputValue("");
    // const responseData = await generateMetaData(inputValue , selectedblockId);
    // response = responseData;
    // updateResponseData(uniqueKey, response);
  }, [inputValue]);

  const marks = [{ value: 0 }, { value: 1000 }, { value: 2000 }, { value: 3000 }, { value: 4000 }, { value: 5000 }];

  return (
    <FormProvider {...methods}>
      <Stack direction={"column"} height={"auto"} gap="0px" justifyContent={"flex-end"} sx={{ mt: "auto" }}>
        <Paper variant="promptBox">
          <InputBase
            value={inputValue}
            name="prompt"
            placeholder={t("type_prompt")}
            onChange={handleInputChange}
            fullWidth
            multiline
            maxRows={4}
          />
        </Paper>
        <Paper variant="footerBox">
          <FormCheckboxInput
            name="apply_directly_to_text"
            keyValue="value"
            options={[{ key: t("apply_directly_to_text"), value: true }]}
            keyExtractor={(option) => option.key}
            renderOption={(option) => option.key}
          />
          {activeButton === "linear" && (
            <Stack height={"auto"}>
              <Slider
                value={value}
                onChange={handleChange}
                size="small"
                min={0}
                max={5000}
                marks={marks}
                valueLabelDisplay="auto"
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center" height={"auto"}>
                <Typography variant="body1">{t("0")}</Typography>
                <Typography variant="body1">{t("5000")}</Typography>
              </Stack>
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%" height={"auto"}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="30%" height={"auto"}>
              <Button
                variant={activeButton === "more" ? "iconClicked" : "iconButton"}
                onClick={() => handleButtonClick("more")}
              >
                <MoreHorizIcon fontSize="small" />
              </Button>
              <Button
                variant={activeButton === "language" ? "iconClicked" : "iconButton"}
                onClick={() => handleButtonClick("language")}
              >
                <LanguageIcon fontSize="small" />
                <Typography variant="h6">{t("en")}</Typography>
              </Button>
              <Button
                variant={activeButton === "terminal" ? "iconClicked" : "iconButton"}
                onClick={() => handleButtonClick("terminal")}
              >
                <TerminalOutlinedIcon fontSize="small" />
              </Button>
              <Button
                variant={activeButton === "graphic" ? "iconClicked" : "iconButton"}
                onClick={() => handleButtonClick("graphic")}
              >
                <GraphicEqOutlinedIcon fontSize="small" />
              </Button>
              <Button
                variant={activeButton === "linear" ? "iconClicked" : "iconButton"}
                onClick={() => handleButtonClick("linear")}
              >
                <LinearScaleOutlinedIcon fontSize="small" />
              </Button>
            </Stack>
            <Button variant="iconClicked" onClick={handleSendClick} disabled={!inputValue}>
              <SendIcon />
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </FormProvider>
  );
};

export { PromptBar };
