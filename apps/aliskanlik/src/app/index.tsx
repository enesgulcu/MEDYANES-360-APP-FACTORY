import { Redirect } from 'expo-router';
import { useUygulamaDurumu } from '../altyapi/store';

/** Giriş noktası: onboarding görülmediyse oraya, görüldüyse ana sayfaya. */
export default function Giris() {
  const onboardingTamam = useUygulamaDurumu((d) => d.onboardingTamam);
  return <Redirect href={onboardingTamam ? '/home' : '/onboarding'} />;
}
