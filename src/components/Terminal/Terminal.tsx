import { useRef, useState, useEffect } from 'react';
import { useTreeDispatch } from '../../hooks/store/treeStore';
import { actions } from '../../hooks/slice/treeSlice';
import validateCommand from '../../utils/checkCommand';
import { FormStyle } from '../../styles/Terminal.styles';

const Terminal: React.FC<{ tree: any }> = ({ tree }) => {
   const [command, setCommand] = useState<string>('');
   const [message, setMessage] = useState<string>('');
   const commandRef = useRef<HTMLInputElement>(null);
   const dispatch = useTreeDispatch();

   useEffect(() => {
      const _message = command ? validateCommand(command, tree) : ''; // set new message

      if (_message) {
         setMessage(_message);
      } else {
         const action = command.split(' ')[0];
         setMessage(''); // reset message
         if (action === 'add') dispatch(actions.addTree(command));
         else if (action === 'delete') dispatch(actions.deleteTree(command));
         else if (action === 'move') dispatch(actions.moveTree(command));
         else if (action === 'change') dispatch(actions.changeTree(command));
         else if (action === 'link') dispatch(actions.linkTree(command));
      }
   }, [command]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!commandRef.current?.value?.trim()) return;

      setCommand(commandRef.current.value?.trim()); // set command
      commandRef.current.value = ''; // reset input value
   };

   return (
      <FormStyle onSubmit={handleSubmit}>
         <div>
            <input type="text" ref={commandRef} placeholder="Enter command here" />
            <input type="button" value="Run" />
         </div>
         <span>{message}</span>
      </FormStyle>
   );
};

export default Terminal;
