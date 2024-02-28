import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

interface TextEditorProps{
	setNoteText:(data:any)=> void;
	noteText:string
}
const TextEditor: React.FC<TextEditorProps> = ({setNoteText, noteText}) => {
  const editorConfiguration = {
    toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo',
				
			]
		},
		
		language: 'en',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		
  };
  
  return (
    <div>
      <CKEditor 
        editor={BalloonEditor}
        data={noteText || "Write your note here...."}
        config={editorConfiguration}
        onChange={(event: any, editor: any) => {	
          const data = editor.getData() ;
          setNoteText(data)
        }}
      />
    </div>
  );
};

export default TextEditor;
