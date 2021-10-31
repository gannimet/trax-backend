import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import TeamSprint from './team-sprint';
import Ticket from './ticket';
import TicketStatus from './ticket-status';
import TicketTag from './ticket-tag';
import TicketType from './ticket-type';
import User from './user';

@Table({
  timestamps: false,
  underscored: true,
  tableName: 'TicketEdits',
})
export default class TicketEdit extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id?: string;

  @Column(DataType.DATE)
  editedAt?: Date;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  editorId?: string;

  @BelongsTo(() => User)
  editor?: User;

  @ForeignKey(() => Ticket)
  @Column(DataType.STRING)
  ticketId?: string;

  @BelongsTo(() => Ticket)
  ticket?: Ticket;

  @Column(DataType.STRING)
  field?:
    | 'TITLE'
    | 'DESCRIPTION'
    | 'ASSIGNEE'
    | 'SPRINT'
    | 'STATUS'
    | 'ADD_TAG'
    | 'REMOVE_TAG'
    | 'TYPE';

  @Column(DataType.STRING)
  previousValue?: string;

  @Column(DataType.STRING)
  newValue?: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  previousAssigneeId?: string;

  @BelongsTo(() => User, 'previousAssigneeId')
  previousAssignee?: User;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  newAssigneeId?: string;

  @BelongsTo(() => User, 'newAssigneeId')
  newAssignee?: User;

  @ForeignKey(() => TeamSprint)
  @Column(DataType.STRING)
  previousSprintId?: string;

  @BelongsTo(() => TeamSprint, 'previousSprintId')
  previousSprint?: TeamSprint;

  @ForeignKey(() => TeamSprint)
  @Column(DataType.STRING)
  newSprintId?: string;

  @BelongsTo(() => TeamSprint, 'newSprintId')
  newSprint?: TeamSprint;

  @ForeignKey(() => TicketStatus)
  @Column(DataType.STRING)
  previousStatusId?: string;

  @BelongsTo(() => TicketStatus, 'previousStatusId')
  previousStatus?: TicketStatus;

  @ForeignKey(() => TicketStatus)
  @Column(DataType.STRING)
  newStatusId?: string;

  @BelongsTo(() => TicketStatus, 'newStatusId')
  newStatus?: TicketStatus;

  @ForeignKey(() => TicketType)
  @Column(DataType.STRING)
  previousTypeId?: string;

  @BelongsTo(() => TicketType, 'previousTypeId')
  previousType?: TicketType;

  @ForeignKey(() => TicketType)
  @Column(DataType.STRING)
  newTypeId?: string;

  @BelongsTo(() => TicketType, 'newTypeId')
  newType?: TicketType;

  @ForeignKey(() => TicketTag)
  @Column(DataType.STRING)
  tagId?: string;

  @BelongsTo(() => TicketTag, 'newTagId')
  tag?: TicketTag;
}
