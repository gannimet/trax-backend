import { v4 as uuidv4 } from 'uuid';
import { HttpErrorString } from '../controllers/constants/http-error-string';
import { HttpErrorMessage } from '../controllers/models/http-error-message';
import Team from '../models/team';
import TeamSprint from '../models/team-sprint';
import TeamUser from '../models/team-user';

export default class TeamService {
  getAllTeams(): Promise<Team[]> {
    return Team.findAll();
  }

  getTeamById(id: string, includeSprints = false): Promise<Team | null> {
    const inclusions = [];

    if (includeSprints) {
      inclusions.push(TeamSprint);
    }

    return Team.findByPk(id, { include: inclusions });
  }

  createSprint(
    teamId: string,
    userId: string,
    name: string,
    description?: string,
  ): Promise<TeamSprint> {
    return TeamUser.findOne({
      where: {
        userId,
        teamId,
        canEditSprints: true,
      },
    }).then(
      (teamUser) => {
        if (teamUser) {
          return this.createSprintLegitimized(teamId, name, description);
        }

        return Promise.reject({
          statusCode: 403,
          errorMessage: HttpErrorString.MISSING_RIGHTS,
        } as HttpErrorMessage);
      },
      (teamUserErr) => {
        return Promise.reject(teamUserErr);
      },
    );
  }

  deleteSprint(
    teamId: string,
    sprintId: string,
    userId: string,
  ): Promise<number> {
    return TeamUser.findOne({
      where: {
        userId,
        teamId,
        canDeleteSprints: true,
      },
    }).then(
      (teamUser) => {
        if (teamUser) {
          return this.deleteSprintLegitimized(sprintId);
        }

        return Promise.reject({
          statusCode: 403,
          errorMessage: HttpErrorString.MISSING_RIGHTS,
        } as HttpErrorMessage);
      },
      (teamUserErr) => {
        return Promise.reject(teamUserErr);
      },
    );
  }

  private createSprintLegitimized(
    teamId: string,
    name: string,
    description?: string,
  ): Promise<TeamSprint> {
    const id = uuidv4();

    return TeamSprint.create({
      id,
      teamId,
      name,
      description,
      active: false,
    });
  }

  private deleteSprintLegitimized(sprintId: string): Promise<number> {
    return TeamSprint.destroy({
      where: {
        id: sprintId,
      },
    });
  }
}