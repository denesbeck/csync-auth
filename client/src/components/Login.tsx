import { InputAdornment, TextField } from "@mui/material";
import { Button, Register } from "../components";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useState } from "react";
import { IAuthAction, login } from "../actions/auth";
import { useAlert } from "../hooks";
import { RegisterProvider } from "../contexts/RegisterContext";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const { alert } = useAlert("global");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: IAuthAction) =>
      login({ email, password }),
  });

  const handleLogin = async () => {
    const res = await mutateAsync({ email, password });
    if (res.success !== true)
      alert({
        id: "login",
        message: res.message,
        severity: "error",
      });
  };

  return (
    <div className="flex z-10 flex-col gap-8 justify-center items-center py-10 w-screen bg-white shadow-2xl min-h-[45vh] sm:rounded-4xl sm:min-w-[35rem] sm:max-w-[35vw] sm:w-[90vw]">
      {isRegisterModalVisible && (
        <RegisterProvider>
          <Register close={() => setIsRegisterModalVisible(false)} />
        </RegisterProvider>
      )}
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl font-semibold text-transparent bg-clip-text from-cyan-300 via-indigo-500 to-blue-400 bg-linear-to-tr">
          Welcome back!
        </h1>

        <p className="text-lg text-center sm:whitespace-nowrap text-slate-400">
          Please login to your account to continue.
        </p>
      </div>
      <TextField
        // suppressHydrationWarning={true}
        disabled={isPending}
        label="Email"
        variant="outlined"
        className="w-[80%]"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Password"
        disabled={isPending}
        type="password"
        variant="outlined"
        className="mb-2 w-[80%]"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(() => event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <div className="grid grid-cols-2 gap-4 w-[80%]">
        <Button
          loading={isPending}
          icon={<VpnKeyIcon className="mr-2" />}
          action={handleLogin}
          variant="primary-solid"
          label="Login"
          wide={true}
        />
        <Button
          loading={isPending}
          icon={<RocketLaunchIcon className="mr-2" />}
          action={() => setIsRegisterModalVisible(true)}
          variant="secondary-outline"
          label="Register"
          wide={true}
        />
      </div>
    </div>
  );
};

export default Login;
