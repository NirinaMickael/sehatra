import { IUser } from './../../pages/page-user/core/models/user';
import { IMessage } from './../../pages/page-user/core/models/IMessage';
import { IConversation } from './converstaion';
export interface IResponse {
    success : boolean;
    data ?: IConversation| IConversation[] | IMessage | IUser;
    message ?: string; 
}