import { IsNumber, IsUrl } from 'class-validator';

export class TestingDto {
  @IsUrl()
  url: string;

  @IsNumber()
  timeout?: number; // Default to 60000 if not provided
  actions: ITestingAction[];
}

export interface ITestingAction {
  action: string;
  selector: string;
  value?: string;
  waiting_after: IWaitAction;
}

export interface IWaitAction {
  for: WaitFor;
  until?: Until;
  timeout?: number;
}
enum WaitFor {
  NetworkIdle = 'networkidle2',
  DOMContentLoaded = 'domcontentloaded',
  Load = 'load',
}
enum Until {
  Visible = 'visible',
  Hidden = 'hidden',
  Attached = 'attached',
  Detached = 'detached',
  Stable = 'stable',
  HiddenOrStable = 'hiddenOrStable',
  NetworkIdle = 'networkidle',
  NetworkIdle2 = 'networkidle2',
  NetworkIdle0 = 'networkidle0',
  Load = 'load',
  DOMContentLoaded = 'domcontentloaded',
  Timeout = 'timeout',
  NoTimeout = 'noTimeout',
  Custom = 'custom',
}
