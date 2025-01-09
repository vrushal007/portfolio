import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Grid2,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

interface ProjectProps {
  title: string;
  projects: {
    title: string;
    description: string;
    technologies: string[];
    points: string[];
    githubLink: string;
    liveLink: string;
  }[];
}

const Projects = ({ data }: { data: ProjectProps }) => {
  return (
    <Container
      sx={{
        overflowX: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          background: "linear-gradient(45deg, #00f5d4, #7209b7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {data.title}
      </Typography>

      <Grid2
        container
        spacing={2}
        columns={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {data.projects.map((project, index) => (
          <Grid2
            alignItems={"stretch"}
            key={index}
            size={{
              lg: 4,
              md: 4,
              xs: 12,
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <Card
              key={index}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: "0 0 auto",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "primary.main" }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {project.description}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {project.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        bgcolor: "secondary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    />
                  ))}
                </Box>
                {project.points.map((point, idx) => (
                  <Box key={idx} sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {point}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ p: 2, justifyContent: "flex-end" }}>
                <IconButton
                  href={project.githubLink}
                  target="_blank"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  href={project.liveLink}
                  target="_blank"
                  sx={{
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <LaunchIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Projects;
