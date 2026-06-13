import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { HomeScreen } from '@/features/dashboard';
import { ExerciseScreen, ExerciseDetailScreen, BodyPartScreen } from '@/features/exercise';
import { ProfileScreen, SettingsScreen, BodyDataScreen, AchievementsScreen } from '@/features/profile';
import { PetScreen } from '@/features/pet';
import { WomenHealthScreen, HealthDetailScreen } from '@/features/health';
import { DietScreen } from '@/features/diet';
import { CommunityScreen } from '@/features/community';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/exercise" element={<ExerciseScreen />} />
          <Route path="/exercise/:id" element={<ExerciseDetailScreen />} />
          <Route path="/exercise/body-part" element={<BodyPartScreen />} />
          <Route path="/pet" element={<PetScreen />} />
          <Route path="/health/detail" element={<HealthDetailScreen />} />
          <Route path="/health/women" element={<WomenHealthScreen />} />
          <Route path="/diet" element={<DietScreen />} />
          <Route path="/community" element={<CommunityScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/profile/settings/:section?" element={<SettingsScreen />} />
          <Route path="/profile/body-data" element={<BodyDataScreen />} />
          <Route path="/profile/achievements" element={<AchievementsScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
