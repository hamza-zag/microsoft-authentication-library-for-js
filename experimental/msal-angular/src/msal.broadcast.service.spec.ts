import { TestBed } from '@angular/core/testing';
import { MSAL_INSTANCE } from './constants';
import { MsalBroadcastService } from './msal.broadcast.service';
import { EventMessage, EventType, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalModule } from './public-api';

const msalInstance = new PublicClientApplication({
      auth: {
        clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
        redirectUri: 'http://localhost:4200'
      }
});

describe('MsalBroadcastService', () => {
  let broadcastService: MsalBroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MsalModule.forRoot(msalInstance, null, {interactionType: InteractionType.Popup, protectedResourceMap: new Map()})
      ],
      providers: [
        MsalBroadcastService
      ]
    });
    broadcastService = TestBed.inject(MsalBroadcastService);
  });
  
  it('broadcasts event from PublicClientApplication', (done) => {
    broadcastService.msalSubject$.subscribe((result) => {
      expect(result.eventType).toEqual(EventType.LOGIN_START);
      expect(result.interactionType).toEqual(InteractionType.Popup);
      expect(result.payload).toEqual(null);
      expect(result.error).toEqual(null);
      expect(result.timestamp).toBeInstanceOf(Number);
      done();
    });

    //@ts-ignore
    msalInstance.emitEvent(EventType.LOGIN_START, InteractionType.Popup);
  });

});