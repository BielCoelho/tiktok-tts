interface BaseTiktokAPIResponse {
  message: string;
  status_code: number;
  status_msg: string;
  extra: {
    log_id: string;
  };
}

interface SuccessTTSResponse extends BaseTiktokAPIResponse {
  status_code: 0;
  data: {
    duration: string;
    s_key: string;
    speaker: string;
    v_str: string;
  };
}

interface ErrorTTSResponse extends BaseTiktokAPIResponse {
  status_code: 1 | 2 | 3 | 4 | 5;
}

export type TiktokAPIResponse = SuccessTTSResponse | ErrorTTSResponse;
