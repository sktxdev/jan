import { activeBotAtom } from "@/_helpers/atoms/Bot.atom";
import {
  MainViewState,
  setMainViewStateAtom,
} from "@/_helpers/atoms/MainView.atom";
import useCreateConversation from "@/_hooks/useCreateConversation";
import useDeleteBot from "@/_hooks/useDeleteBot";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import ExpandableHeader from "../ExpandableHeader";

const BotInfo: React.FC = () => {
  const { deleteBot } = useDeleteBot();
  const { createConvoByBot } = useCreateConversation();
  const setMainView = useSetAtom(setMainViewStateAtom);
  const botInfo = useAtomValue(activeBotAtom);
  if (!botInfo) return null;

  const onNewChatClicked = () => {
    if (!botInfo) {
      alert("No bot selected");
      return;
    }

    createConvoByBot(botInfo);
  };

  const onDeleteBotClick = async () => {
    // TODO: display confirmation diaglog
    const result = await deleteBot(botInfo._id);
    if (result === "success") {
      setMainView(MainViewState.Welcome);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-1 my-1">
      <ExpandableHeader title="BOT INFO" expanded={true} onClick={() => {}} />

      <div className="flex flex-col">
        <label>{botInfo.name}</label>
        <PrimaryButton onClick={onNewChatClicked} title="New chat" />
        <span>{botInfo.description}</span>
      </div>

      <PrimaryButton
        title="Delete bot"
        onClick={onDeleteBotClick}
        className="bg-red-500 hover:bg-red-400"
      />
    </div>
  );
};

export default BotInfo;